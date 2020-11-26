import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { MongoConfigService } from './services/config/mongo-config.service';
import { ConfigService } from './services/config/config.service';
import { UserSchema } from './schemas/user.schema';
import { UserLinkSchema } from './schemas/user-link.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity'
import { UserTokenEntity } from './entities/user-token.entity'
import { UserRepository } from './repositories/user.repository'
import { UserTokensRepository } from './repositories/user-token.repository'

@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity, UserRepository, UserTokenEntity, UserTokensRepository])
    // MongooseModule.forRootAsync({
    //   useClass: MongoConfigService
    // }),
    // MongooseModule.forFeature([
    //   {
    //     name: 'User',
    //     schema: UserSchema,
    //     collection: 'users'
    //   },
    //   {
    //     name: 'UserLink',
    //     schema: UserLinkSchema,
    //     collection: 'user_links'
    //   }
    // ])
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserEntity, UserRepository, UserTokenEntity, UserTokensRepository,
    UserService,
    ConfigService,
    {
      provide: 'MAILER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mailerServiceOptions = configService.get('mailerService');
        return ClientProxyFactory.create(mailerServiceOptions);
      },
      inject: [
        ConfigService
      ]
    },
    {
      provide: 'DBCONN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const dbConnServiceOptions = configService.get('dbConnService');
        return ClientProxyFactory.create(dbConnServiceOptions);
      },
      inject: [
        ConfigService
      ]
    }
  ]
})
export class UserModule { }
