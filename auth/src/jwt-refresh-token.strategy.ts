// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, BadRequestException, HttpStatus, UnauthorizedException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config'
// import { Request } from 'express';
// import { UserSimpleDTO } from '@modules/user/dto';
// import { UserService } from '@modules/user/user.service';
// import { TJwtPayload } from '../../types/index';
// import { INTERNAL_ERROR_CODE } from '@commons/constants'
// /**
//  * Powered by Thuan
//  * @author thuan.nguyen
//  * @namespace auth
//  * @classname JwtRefreshTokenStrategy
//  **/
// @Injectable()
// export class JwtRefreshTokenStrategy extends PassportStrategy(
//     Strategy,
//     'jwt-refresh-token'
// ) {
//     constructor(
//         private readonly userService: UserService,
//         configService: ConfigService,
//     ) {
//         super({
//             jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
//                 return request?.body?.refresh_token;
//             }]),
//             secretOrKey: configService.get('JWT_REFRESH_SECRET'),
//             passReqToCallback: true,
//         });
//     }

//     async validate(request: Request, payload: TJwtPayload): Promise<UserSimpleDTO> {
//         const refreshToken = request.body?.refresh_token;
//         const user = await this.userService.getUserIfRefreshTokenMatches(refreshToken, payload);
//         if (!user) {
//             throw new UnauthorizedException('Cannot find user via refresh token');
//         }
//         return user;
//     }
// }