// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Injectable, HttpException, HttpStatus, InternalServerErrorException, BadRequestException, UnauthorizedException } from '@nestjs/common';
// import { TJwtPayload } from '../../types/auth/jwt-payload.type';
// import { UserSimpleDTO } from '@modules/user/dto';
// import { ConfigService } from '@nestjs/config'
// import { TokenService } from '@app/shared/services'
// import { CForbiddenException } from '@custom-exceptions/*'
// import { INTERNAL_ERROR_CODE } from '@commons/constants'

// /**
//  * Powered by Thuan
//  * @author thuan.nguyen
//  * @namespace auth
//  * @classname JwtAccessTokenStrategy
//  **/
// @Injectable()
// export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
//     constructor(private readonly tokenService: TokenService, configService: ConfigService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromExtractors([
//                 ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ]),
//             ignoreExpiration: true,
//             secretOrKey: configService.get("JWT_ACCESS_SECRET"),
//         });
//     }

//     async validate(payload: TJwtPayload): Promise<UserSimpleDTO> {
//         const user = await this.tokenService.validatePayload(payload);
//         if (!user) {
//             throw new UnauthorizedException('Cannot find user via payload');
//         }
//         return user;
//     }
// }