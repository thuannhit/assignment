import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace auth
 * @classname JwtAccessTokenAuthGuard
 **/
@Injectable()
export class JwtAccessTokenAuthGuard extends AuthGuard('jwt-access-token') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}