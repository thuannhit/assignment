import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Req,
  Inject,
  HttpStatus,
  HttpException,
  Param,
  UseGuards
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { Authorization } from './decorators/authorization.decorator';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { ServiceUserCreateDTO } from './interfaces/user/dto/service-user-create-response.dto';
import { IServiceUserSearchResponse } from './interfaces/user/service-user-search-response.interface';
import { IServiveTokenCreateResponse } from './interfaces/token/service-token-create-response.interface';
import { IServiceTokenDestroyResponse } from './interfaces/token/service-token-destroy-response.interface';
import { IServiceUserConfirmResponse } from './interfaces/user/service-user-confirm-response.interface';
import { IServiceUserGetByIdResponse } from './interfaces/user/service-user-get-by-id-response.interface';

import { GetUserByTokenResponseDto } from './interfaces/user/dto/get-user-by-token-response.dto';
import { CreateUserReqDto } from './interfaces/user/dto/user-register-request.dto';
import { UserRegisterResponseDto } from './interfaces/user/dto/user-register-response.dto';
import { LoginUserDto } from './interfaces/user/dto/login-user.dto';
import { LoginUserResponseDto } from './interfaces/user/dto/login-user-response.dto';
import { LogoutUserResponseDto } from './interfaces/user/dto/logout-user-response.dto';
import { ConfirmUserDto } from './interfaces/user/dto/confirm-user.dto';
import { ConfirmUserResponseDto } from './interfaces/user/dto/confirm-user-response.dto';

@Controller('user')
@ApiTags('users')
export class UsersController {

  constructor(
    @Inject('AUTH_SERVICE') private readonly authMicroServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userMicroServiceClient: ClientProxy
  ) { }

  @Get()
  @Authorization(true)
  @ApiOkResponse({
    type: GetUserByTokenResponseDto
  })
  public async getUserByToken(
    @Req() request: IAuthorizedRequest
  ): Promise<GetUserByTokenResponseDto> {
    const userInfo = request.user;

    const userResponse: IServiceUserGetByIdResponse = await this.userMicroServiceClient.send(
      'user_get_by_id',
      userInfo._id
    ).toPromise();

    return {
      message: userResponse.message,
      data: {
        user: userResponse.user
      },
      errors: null
    };
  }

  @Post('register')
  @ApiCreatedResponse({
    type: UserRegisterResponseDto
  })
  public async createUser(
    @Body() userRequest: CreateUserReqDto
  ): Promise<UserRegisterResponseDto> {
    const createUserResponse: ServiceUserCreateDTO = await this.userMicroServiceClient.send(
      'user_create',
      userRequest
    ).toPromise();
    if (createUserResponse.status !== HttpStatus.OK) {
      throw new HttpException({
        message: createUserResponse.message,
        data: null,
        errors: createUserResponse.errors
      }, createUserResponse.status);
    }

    // const createTokenResponse: IServiveTokenCreateResponse = await this.authMicroServiceClient.send('token_create', {
    //   userId: createUserResponse.user._id
    // }).toPromise();

    // return {
    //   message: createUserResponse.message,
    //   data: {
    //     user: createUserResponse.user,
    //     token: createTokenResponse.token
    //   },
    //   errors: null
    // };
    return {
      message: createUserResponse.message,
      data: {
        user: createUserResponse.user,
        token: ''
      },
      errors: null
    };
  }

  @Post('login')
  @ApiCreatedResponse({
    type: LoginUserResponseDto
  })
  public async loginUser(
    @Req() request,
    @Body() loginRequest: LoginUserDto
  ): Promise<LoginUserResponseDto> {
    const w: LoginUserResponseDto = await this.authMicroServiceClient.send('login', request).toPromise()
    console.log('w', w)

    const getUserResponse: IServiceUserSearchResponse = await this.userMicroServiceClient.send(
      'user_search_by_credentials',
      loginRequest
    ).toPromise();

    if (getUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getUserResponse.message,
          data: null,
          errors: null
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    const createTokenResponse: IServiveTokenCreateResponse = await this.authMicroServiceClient.send('token_create', {
      userId: getUserResponse.user._id
    }).toPromise();

    return {
      message: createTokenResponse.message,
      data: {
        user: null,
        refresh_token: createTokenResponse.token,
        access_token: createTokenResponse.token
      },
      errors: null
    };
  }

  @Put('/logout')
  @Authorization(true)
  @ApiCreatedResponse({
    type: LogoutUserResponseDto
  })
  public async logoutUser(
    @Req() request: IAuthorizedRequest
  ): Promise<LogoutUserResponseDto> {
    const userInfo = request.user;

    const destroyTokenResponse: IServiceTokenDestroyResponse = await this.authMicroServiceClient.send('token_destroy', {
      userId: userInfo._id
    }).toPromise();

    if (destroyTokenResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: destroyTokenResponse.message,
          data: null,
          errors: destroyTokenResponse.errors
        },
        destroyTokenResponse.status
      );
    }

    return {
      message: destroyTokenResponse.message,
      errors: null,
      data: null
    };
  }

  @Get('/confirm/:link')
  @ApiCreatedResponse({
    type: ConfirmUserResponseDto
  })
  public async confirmUser(
    @Param() params: ConfirmUserDto
  ): Promise<ConfirmUserResponseDto> {
    const confirmUserResponse: IServiceUserConfirmResponse = await this.userMicroServiceClient.send(
      'user_confirm',
      {
        link: params.link
      }
    ).toPromise();

    if (confirmUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: confirmUserResponse.message,
          data: null,
          errors: confirmUserResponse.errors
        },
        confirmUserResponse.status
      );
    }

    return {
      message: confirmUserResponse.message,
      errors: null,
      data: null
    };
  }

}
