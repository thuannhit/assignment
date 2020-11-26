import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace auth
 * @classname JwtRefreshTokenAuthGuard
 **/
@Injectable()
export class JwtRefreshTokenAuthGuard extends AuthGuard('jwt-refresh-token') { }