import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { IToken } from '../interfaces/token.interface';
import { TJwtPayload } from '../interfaces/jwt-payload.type'
import { ConfigService } from './config/config.service'
@Injectable()
export class TokenService {

  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ) { }

  public getJwtAccessToken(payload: TJwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get("accessSecretKey"),
      expiresIn: this.getJwtAccessExpTime()
    })
  }

  public getJwtRefreshToken(payload: TJwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get("refreshSecretKey"),
      expiresIn: this.getJwtRefreshExpTime()
    });
  }

  private getJwtAccessExpTime(): string {
    return `${this.configService.get('accessExpirationTime')}s`
  }

  private getJwtRefreshExpTime(): string {
    return `${this.configService.get('refreshExpirationTime')}s`
  }















  // public createToken(userId: string): Promise<IToken> {
  //   const token = this.jwtService.sign(
  //     {
  //       userId
  //     },
  //     {
  //       expiresIn: 30 * 24 * 60 * 60
  //     }
  //   );

  //   return new this.tokenModel({
  //     user_id: userId,
  //     token
  //   }).save();
  // }

  // public deleteTokenForUserId(userId: string): Query<any> {
  //   return this.tokenModel.remove({
  //     user_id: userId
  //   });
  // }

  // public async decodeToken(token: string) {
  //   const tokenModel = await this.tokenModel.find({
  //     token
  //   });
  //   let result = null;

  //   if (tokenModel && tokenModel[0]) {
  //     try {
  //       const tokenData = this.jwtService.decode(tokenModel[0].token) as { exp: number, userId: any };
  //       if (!tokenData || tokenData.exp <= Math.floor(+ new Date() / 1000)) {
  //         result = null;
  //       } else {
  //         result = {
  //           userId: tokenData.userId
  //         };
  //       }
  //     } catch (e) {
  //       result = null;
  //     }
  //   }
  //   return result;
  // }

}
