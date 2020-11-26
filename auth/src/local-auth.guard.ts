import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace auth
 * @classname LocalAuthGuard
 **/
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    // canActivate(
    //     context: ExecutionContext,
    // ): boolean | Promise<boolean> | Observable<boolean> {
    //     console.log('context', context.switchToHttp().getRequest())
    //     const request = context.switchToHttp().getRequest();
    //     return false
    // }
}
// @Injectable()
// export class LocalAuthGuard implements CanActivate {
//     canActivate(
//         context: ExecutionContext,
//     ): boolean | Promise<boolean> | Observable<boolean> {
//         console.log('context', context.switchToHttp().getRequest())
//         const request = context.switchToHttp().getRequest();
//         return request
//     }
// }