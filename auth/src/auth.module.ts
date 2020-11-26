import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { TokenService } from './services/token.service';
import { JwtConfigService } from './services/config/jwt-config.service';
import { JwtService } from '@nestjs/jwt';
import { MongoConfigService } from './services/config/mongo-config.service';
import { TokenSchema } from './schemas/token.schema';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import {UserService} from './services/user.service'
import {LocalStrategy} from './local.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({})
  ],
  controllers: [
    AuthController
  ],
  providers: [
    ConfigService,
    TokenService,
    UserService,
    LocalStrategy,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [
        ConfigService
      ]
    }
  ]
})
export class AuthModule {}
