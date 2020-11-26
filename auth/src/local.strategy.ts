import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject, ExecutionContext } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserSimpleInfoDTO } from './dtos/user-simple-info.dto';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace auth
 * @classname LocalStrategy
 **/
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        private userService: UserService,
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<UserSimpleInfoDTO | null> {
        console.log('TESTS ENGTER to Local')
        const user: UserSimpleInfoDTO = await this.userService.getUserIfPasswordMatches(username, password);
        if (!user) {
            return null;
        }
        return user;
    }
}