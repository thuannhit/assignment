import { Injectable } from '@nestjs/common';
import {
    EntityRepository,
    Repository
} from 'typeorm';

import { UserTokenEntity } from '../entities/user-token.entity';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace user
 * @classname UserTokensRepository
 **/
@Injectable()
@EntityRepository(UserTokenEntity)
export class UserTokensRepository extends Repository<UserTokenEntity> {
}