import { Module } from '@nestjs/common';
import { AppController } from './db-conn.controller';
import { DBConnService } from './services/db-conn.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, TypeOrmConfigService } from './services/config';
import { UserRepository } from './repositories/user.repository';
import { UserTokensRepository } from './repositories/user-token.repository'
import { UserEntity } from './entities/user.entity'
import { UserTokenEntity } from './entities/user-token.entity'
@Module({
  imports: [
    ConfigService,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([UserEntity, UserRepository, UserTokenEntity, UserTokensRepository]),
  ],
  controllers: [AppController],
  providers: [DBConnService],
})
export class DBConnModule { }
