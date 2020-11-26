import { Controller, HttpStatus, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TokenService } from './services/token.service';
import { ITokenResponse } from './interfaces/token-response.interface';
import { ITokenDataResponse } from './interfaces/token-data-response.interface';
import { ITokenDestroyResponse } from './interfaces/token-destroy-response.interface';

import { ILoginUserResponse } from './interfaces/login-user-response.interface'
import { UserSimpleInfoDTO } from './dtos/user-simple-info.dto';

import { TJwtPayload } from './interfaces/jwt-payload.type'

import { LocalAuthGuard } from './local-auth.guard'

@Controller()
export class AuthController {

  constructor(
    private readonly tokenService: TokenService
  ) { }

  // @MessagePattern('token_create')
  // public async createToken(data: { userId: string }): Promise<ITokenResponse> {
  //   let result: ITokenResponse;
  //   if (data && data.userId) {
  //     try {
  //       const createResult = await this.tokenService.createToken(data.userId);
  //       result = {
  //         status: HttpStatus.CREATED,
  //         message: 'token_create_success',
  //         token: createResult.token
  //       };
  //     } catch (e) {
  //       result = {
  //         status: HttpStatus.BAD_REQUEST,
  //         message: 'token_create_bad_request',
  //         token: null
  //       };
  //     }
  //   } else {
  //     result = {
  //       status: HttpStatus.BAD_REQUEST,
  //       message: 'token_create_bad_request',
  //       token: null
  //     };
  //   }

  //   return result;
  // }

  // @MessagePattern('token_destroy')
  // public async destroyToken(data: { userId: string }): Promise<ITokenDestroyResponse> {
  //   return {
  //     status: data && data.userId ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
  //     message: data && data.userId ?
  //       await this.tokenService.deleteTokenForUserId(data.userId) && 'token_destroy_success' :
  //       'token_destroy_bad_request',
  //     errors: null
  //   };
  // }

  // @MessagePattern('token_decode')
  // public async decodeToken(data: { token: string }): Promise<ITokenDataResponse> {
  //   const tokenData = await this.tokenService.decodeToken(data.token);
  //   return {
  //     status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
  //     message: tokenData ? 'token_decode_success' : 'token_decode_unauthorized',
  //     data: tokenData
  //   };
  // }

  @MessagePattern('login')
  @UseGuards(LocalAuthGuard)
  public async doLogin(user: any): Promise<ILoginUserResponse> {
  // public async doLogin(user: UserSimpleInfoDTO): Promise<ILoginUserResponse> {
    // console.log('TEST', user)
    if (user !== null) {
      const jwtPayload: TJwtPayload = {
        _id: user._id,
        user_name: user.user_name,
        email: user.email
      }
      const access_token = await this.tokenService.getJwtAccessToken(jwtPayload);
      const refresh_token = await this.tokenService.getJwtRefreshToken(jwtPayload);
      return {
        status: access_token ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
        message: access_token ? 'token_decode_success' : 'token_decode_unauthorized',
        data: {
          access_token: access_token,
          refresh_token: refresh_token,
          user: user
        },
        errors: null
      }
    }
  }
}
