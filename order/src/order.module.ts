import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConfigService } from './services/config/mongo-config.service';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';
import { OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService
    }),
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema
      }
    ])
  ],
  controllers: [
    OrderController
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule {}
