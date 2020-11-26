import { Controller, Get } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { UserFullResDTO } from './dtos/user-full-info-response.dto'
import { DBConnService } from './services/db-conn.service'
import { UserRegisterReqDTO } from './dtos/user-register-request.dto'
import { UserFullEntityExceptPasswordDTO } from './dtos/user-full-entity-except-password.dto'
import { UserEntity } from './entities/user.entity';
@Controller()
export class AppController {
  constructor(private readonly dbConnService: DBConnService) { }

  @Get()
  getHello(): string {
    return ''
  }

  @MessagePattern('search_user_by_email')
  public async searchUserByCredentials(
    searchParams: { email: string }
  ): Promise<UserEntity | null> {
    const user = await this.dbConnService.findByEmail(searchParams.email)
    return user
  }

  @MessagePattern('search_user_by_id')
  public async getEssentialUserInfoByEmail(
    searchParams: { _id: number }
  ): Promise<UserEntity | null> {
    const user = await this.dbConnService.findById(searchParams._id)
    return user
  }

  @MessagePattern('add_new_user')
  public async add_new_user(
    newUser: UserRegisterReqDTO
  ): Promise<UserEntity> {
    const user: UserEntity = await this.dbConnService.createNewUser(newUser)
    return user
  }
}
