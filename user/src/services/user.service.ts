import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProxy } from '@nestjs/microservices';

import { ConfigService } from './config/config.service';
import { IUser } from '../interfaces/user.interface';
import { IUserLink } from '../interfaces/user-link.interface';
import { UserFullResDTO } from '../dtos/user-full-info-response.dto'
import { UserRegisterReqDTO } from '../dtos/user-register-request.dto'

import { UserRepository } from '../repositories/user.repository'
import { UserTokensRepository } from 'src/repositories/user-token.repository';
import * as bcrypt from 'bcrypt';
import { UserEssentialInfoReqDTO } from '../dtos/user-esstential-info-request.dto'
import { IUserEssentialInfo } from '../interfaces/user-esstential-info.interface'
import { IUserFullEntityCreation } from '../interfaces/user-creation-entity.interface'

import { toFullUserResDTO, toEssentialUserInfoResDTO } from '../utils/mapper'
import { UserEntity } from 'src/entities/user.entity';
@Injectable()
export class UserService {

  constructor(
    @Inject('DBCONN_SERVICE') private readonly dbConnMicroServiceClient: ClientProxy,
    // @InjectModel('User') private readonly userModel: Model<IUser>,
    // @InjectModel('UserLink') private readonly userLinkModel: Model<IUserLink>,
  ) { }

  public async searchUserByEmail(params: { email: string }): Promise<UserFullResDTO | null> {
    const user: UserEntity = await this.dbConnMicroServiceClient.send('search_user_by_email', { email: params.email }).toPromise()
    if (user !== null) {
      return toFullUserResDTO(user)
    }
    return null
  }

  public async getEssentialUserInfo(params: UserEssentialInfoReqDTO): Promise<IUserEssentialInfo | null> {
    const user: UserEntity = (params._id) ? await this.dbConnMicroServiceClient.send('search_user_by_id', { _id: params._id }).toPromise()
      : await this.dbConnMicroServiceClient.send('search_user_by_email', { email: params.email }).toPromise()
    if(user!==null){
      return toEssentialUserInfoResDTO(user)
    }
    return null
  }

  public async registerUser(newUser: UserRegisterReqDTO): Promise<UserFullResDTO | null> {
    const oNewUSer: IUserFullEntityCreation = {
      user_name: newUser.user_name,
      email: newUser.email,
      password: await bcrypt.hash(newUser.password, 10),
      _role_id: 0,
      created_by: 1,
      updated_by: 1,
      name: newUser.name,
      phone_number: '',
      is_deleted: 0,
      is_active: 0,
      is_verified: 0
    }
    const user: UserEntity = await this.dbConnMicroServiceClient.send('add_new_user', oNewUSer).toPromise()
    return toFullUserResDTO(user)

    //TODO: Send email for verify email
    // userParams.is_confirmed = false;
    // const createdUser = await this.userService.createUser(userParams);
    // const userLink = await this.userService.createUserLink(createdUser.id);
    // delete createdUser.password;
    // result = {
    //   status: HttpStatus.CREATED,
    //   message: 'user_create_success',
    //   user: createdUser,
    //   errors: null
    // };
    // this.mailerServiceClient.send('mail_send', {
    //   to: createdUser.email,
    //   subject: 'Email confirmation',
    //   html: `<center>
    //     <b>Hi there, please confirm your email to use Smoothday.</b><br>
    //     Use the following link for this.<br>
    //     <a href="${this.userService.getConfirmationLink(userLink.link)}"><b>Confirm The Email</b></a>
    //     </center>`
    // }).toPromise();
  }

  // public async searchUserById(id: string): Promise<IUser> {
  //   return this.userModel.findById(id).exec();
  // }

  // public async updateUserById(id: string, userParams: { is_confirmed: boolean }): Promise<IUser> {
  //   return this.userModel.updateOne({ _id: id }, userParams).exec();
  // }

  // public async createUser(user: IUser): Promise<IUser> {
  //   const userModel = new this.userModel(user);
  //   return await userModel.save();
  // }

  // public async createUserLink(id: string): Promise<IUserLink> {
  //   const userLinkModel = new this.userLinkModel({
  //     user_id: id
  //   });
  //   return await userLinkModel.save();
  // }

  // public async getUserLink(link: string): Promise<IUserLink[]> {
  //   return this.userLinkModel.find({ link, is_used: false }).exec();
  // }

  // public async updateUserLinkById(id: string, linkParams: { is_used: boolean }): Promise<IUserLink> {
  //   return this.userLinkModel.updateOne({ _id: id }, linkParams);
  // }

  // public getConfirmationLink(link: string): string {
  //   return `${this.configService.get('baseUri')}:${this.configService.get('gatewayPort')}/users/confirm/${link}`;
  // }

}
