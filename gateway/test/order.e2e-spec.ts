import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { AppModule } from '../src/app.module';
import { userSignupRequestSuccess } from './mocks/user-signup-request-success.mock';
import { orderCreateRequestSuccess } from './mocks/order-create-request-success.mock';
import { orderUpdateRequestSuccess } from './mocks/order-update-request-success.mock';

describe('Orders (e2e)', () => {
  let app;
  let user;
  let orderId: string;
  let userToken: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DSN, { useNewUrlParser: true });
    await mongoose.connection.dropDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/ (POST) - should create a user for checking orders api', (done) => {
    return request(app.getHttpServer())
      .post('/users/')
      .send(userSignupRequestSuccess)
      .expect(201)
      .end(done);
  });

  it('/users/login (POST) - should create a token for valid credentials', (done) => {
    return request(app.getHttpServer())
      .post('/users/login')
      .send(userSignupRequestSuccess)
      .expect(201)
      .expect((res) => {
        userToken = res.body.data.token;
      })
      .end(done);
  });

  it('/orders (GET) - should not return orders without valid token', (done) => {
    return request(app.getHttpServer())
      .get('/orders')
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null
      })
      .end(done);
  });

  it('/orders (POST) - should not create an order without a valid token', (done) => {
    return request(app.getHttpServer())
      .post('/orders')
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null
      })
      .end(done);
  });

  it('/orders (POST) - should not create a order with an invalid token', (done) => {
    return request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', userToken + 1)
      .send(orderCreateRequestSuccess)
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null
      })
      .end(done);
  });

  it('/orders (POST) - should not create a order for an unconfirmed user with valid token', (done) => {
    return request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', userToken)
      .send(orderCreateRequestSuccess)
      .expect(403)
      .expect({
        message: 'permission_check_forbidden',
        data: null,
        errors: null
      })
      .end(done);
  });

  it('/orders (GET) - should not retrieve orders without a valid token', (done) => {
    return request(app.getHttpServer())
      .get('/orders')
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null
      })
      .end(done);
  });

  it('/orders (GET) - should not retrieve orders with an valid token', (done) => {
    return request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', userToken + 1)
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null
      })
      .end(done);
  });

  it('/orders (POST) - should not retrieve orders for an unconfirmed user with valid token', (done) => {
    return request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', userToken)
      .expect(403)
      .expect({
        message: 'permission_check_forbidden',
        data: null,
        errors: null
      })
      .end(done);
  });

  it('/users/confirm/:link (GET) - should confirm user', async () => {
    user = await mongoose.connection.collection('users').find({
      email: userSignupRequestSuccess.email
    }).toArray();
    const userConfirmation = await mongoose.connection.collection('user_links').find({
      user_id: user[0]._id.toString()
    }).toArray();

    return request(app.getHttpServer())
      .get(`/users/confirm/${userConfirmation[0].link}`)
      .send()
      .expect(200)
      .expect({
        message: 'user_confirm_success',
        errors: null,
        data: null
      });
  });

  it('/orders (POST) - should create a order for the user with a valid token', (done) => {
    return request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', userToken)
      .send(orderCreateRequestSuccess)
      .expect(201)
      .expect((res) => {
        orderId = res.body.data.order.id;
        res.body.data.order.id = 'fake_value';
        res.body.data.order.created_at = 'fake_value';
        res.body.data.order.updated_at = 'fake_value';
      })
      .expect({
        message: 'order_create_success',
        data: {
          order: {
            notification_id: null,
            name:  orderCreateRequestSuccess.name,
            description: orderCreateRequestSuccess.description,
            start_time: orderCreateRequestSuccess.start_time,
            duration: orderCreateRequestSuccess.duration,
            user_id: user[0]._id.toString(),
            is_solved: false,
            created_at: 'fake_value',
            updated_at: 'fake_value',
            id: 'fake_value'
          }
        },
        errors: null
      })
      .end(done);
  });

  it('/orders (POST) - should not create a order with invalid params', (done) => {
    return request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', userToken)
      .send(null)
      .expect(412)
      .expect((res) => {
        res.body.errors.duration.properties = 'fake_properties';
        res.body.errors.start_time.properties = 'fake_properties';
        res.body.errors.name.properties = 'fake_properties';
      })
      .expect(
        {
          message: 'order_create_precondition_failed',
          data: null,
          errors: {
            duration: {
              message: 'Duration can not be empty',
              name: 'ValidatorError',
              properties: 'fake_properties',
              kind: 'required',
              path: 'duration'
            },
            start_time: {
              message: 'Start time can not be empty',
              name: 'ValidatorError',
              properties: 'fake_properties',
              kind: 'required',
              path: 'start_time'
            },
            name: {
              message: 'Name can not be empty',
              name: 'ValidatorError',
              properties: 'fake_properties',
              kind: 'required',
              path: 'name'
            }
          }
        }
      )
      .end(done);
  });

  it('/orders (GET) - should retrieve orders for a valid token', (done) => {
    return request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', userToken)
      .expect(200)
      .expect((res) => {
        res.body.data.orders[0].created_at = 'fake_value';
        res.body.data.orders[0].updated_at = 'fake_value';
      })
      .expect(
        {
          message: 'order_search_by_user_id_success',
          data: {
            orders: [
              {
                notification_id: null,
                name: orderCreateRequestSuccess.name,
                description: orderCreateRequestSuccess.description,
                start_time: orderCreateRequestSuccess.start_time,
                duration: orderCreateRequestSuccess.duration,
                created_at: 'fake_value',
                updated_at: 'fake_value',
                user_id: user[0]._id.toString(),
                is_solved: false,
                id: orderId
              }
            ]
          },
          errors: null
        }
      )
      .end(done);
  });

  it('/orders/{id} (PUT) - should not order with invalid token', (done) => {
    return request(app.getHttpServer())
      .put(`/orders/${orderId}`)
      .send(orderUpdateRequestSuccess)
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null
      })
      .end(done);
  });

  it('/orders/{id} (PUT) - should not update order with user_id param', (done) => {
    return request(app.getHttpServer())
      .put(`/orders/${orderId}`)
      .set('Authorization', userToken)
      .send({
        ...orderUpdateRequestSuccess,
        user_id: user[0]._id.toString() + 1
      })
      .expect(412)
      .expect((res) => {
        res.body.errors.user_id.properties = 'fake_properties';
      })
      .expect({
        message: 'order_update_by_id_precondition_failed',
        data: null,
        errors: {
          user_id: {
            message: 'The field value can not be updated',
            name: 'ValidatorError',
            properties: 'fake_properties',
            kind: 'user defined',
            path: 'user_id'
          }
        }
      })
      .end(done);
  });

  it('/orders/{id} (PUT) - should update order with valid params', (done) => {
    return request(app.getHttpServer())
      .put(`/orders/${orderId}`)
      .set('Authorization', userToken)
      .send(orderUpdateRequestSuccess)
      .expect(200)
      .expect((res) => {
        res.body.data.order.created_at = 'fake_value';
        res.body.data.order.updated_at = 'fake_value';
      })
      .expect({
        message: 'order_update_by_id_success',
        data: {
          order: {
            notification_id: null,
            name: orderUpdateRequestSuccess.name,
            description: orderUpdateRequestSuccess.description,
            start_time: orderUpdateRequestSuccess.start_time,
            duration: orderUpdateRequestSuccess.duration,
            created_at: 'fake_value',
            updated_at: 'fake_value',
            user_id: user[0]._id.toString(),
            is_solved: orderUpdateRequestSuccess.is_solved,
            id: orderId
          }
        },
        errors: null
      })
      .end(done);
  });

  it('/orders/{id} (DELETE) - should not delete order with invalid token', (done) => {
    return request(app.getHttpServer())
      .delete(`/orders/${orderId}`)
      .send()
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null
      })
      .end(done);
  });

  it('/orders/{id} (DELETE) - should delete order with a valid token', (done) => {
    return request(app.getHttpServer())
      .delete(`/orders/${orderId}`)
      .set('Authorization', userToken)
      .send()
      .expect(200)
      .expect({
        message: 'order_delete_by_id_success',
        data: null,
        errors: null
      })
      .end(done);
  });

});
