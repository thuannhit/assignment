import {
    Injectable,
    Dependencies,
    NotFoundException,
    HttpStatus,
    HttpException,
    BadRequestException
} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserTokenEntity } from '../entities/user-token.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserTokensRepository } from '../repositories/user-token.repository';
// import * as bcrypt from 'bcrypt';
// import { UserSearchRequest } from './dto/user-search.request';
// import { INTERNAL_ERROR_CODE, TOKEN_TYPE } from '@commons/constants'
// import {
//     isPasswordMatched,
//     isValidEmail,
//     toUserLoginResDto
// } from '@utilities/index';
import { isValidEmail } from '../utils/validation.utils'
import {
    // UserRegisterReqDTO,
    // UserLoginResDTO,
    // UserRegisterResDTO,
    // UserSimpleDTO,
    // UserTokenDTO
} from '../dtos/user-full-info-response.dto'
import {UserFullEntityExceptPasswordDTO} from '../dtos/user-full-entity-except-password.dto'
import {UserRegisterReqDTO} from '../dtos/user-register-request.dto'
import {UserFullResDTO} from '../dtos/user-full-info-response.dto'
import { ConfigService } from '@nestjs/config';
import {
    // toUserRegisterResDTO,
    // toSimpleUserDto,
    toFullUserEntityOmitPasswordDTO, 
    toFullUserResDTO
} from '../utils/mapper'
// import { TJwtPayload } from '../../types/auth/jwt-payload.type'
import { InsertResult } from 'typeorm';

/**
 * @author thuan.nguyen
 * @namespace dbConn
 * @classname DBConnService
 **/
@Injectable()
@Dependencies(UserRepository, UserTokensRepository)
export class DBConnService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userTokensRepository: UserTokensRepository,
    ) {
    }

    // async findOne(userId: number): Promise<User> {
    //     const userData = await this.userRepository.findOne({ id: userId });
    //     if (!userData) throw new NotFoundException();
    //     return userData;
    // }

    // getUserList(query: UserSearchRequest): Promise<User[]> {
    //     return this.userRepository.searchUser(query);
    // }

    // async getUserIfPasswordMatches(email: string, plainTextPassword: string): Promise<UserLoginResDTO> {
    //     const user = await this.userRepository.findOne({ email: email })
    //     if (!user) {
    //         throw new BadRequestException('Invalid email', INTERNAL_ERROR_CODE.INVALID_USER_NAME);
    //     }
    //     const passwordMatched = await isPasswordMatched(user.password, plainTextPassword);

    //     if (passwordMatched) {
    //         return toUserLoginResDto(user)
    //     }
    //     throw new BadRequestException('Wrong password', INTERNAL_ERROR_CODE.INVALID_PASSWORD);
    // }

    async createNewUser(newUser: UserRegisterReqDTO): Promise<UserEntity> {
        const insertRs: InsertResult = await this.userRepository.insert({
            name: newUser.name,
            password: newUser.password,
            email: newUser.email,
            phone_number: newUser.phone_number,
            user_name: newUser.user_name,
            is_active: newUser.is_active,
            is_deleted:newUser.is_deleted,
            is_verified: newUser.is_verified,
            created_by: newUser.created_by,
            updated_by: newUser.updated_by,
            _role_id: newUser._role_id
        });
        const oUser = await this.userRepository.findOne(insertRs.identifiers[0].id)
        return oUser;

    }

    // async getUserIfRefreshTokenMatches(refreshToken: string, payload: TJwtPayload): Promise<UserSimpleDTO | null> {
    //     const usertoken = await this.userTokensRepository.findOne({ userId: payload.userId, tokenType: TOKEN_TYPE.REFRESH_TOKEN });
    //     if (!usertoken) {
    //         throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
    //     }
    //     const isRefreshTokenMatching = await bcrypt.compare(
    //         refreshToken,
    //         usertoken.tokenValue
    //     );

    //     if (isRefreshTokenMatching) {
    //         return await this.findByPayload(payload)
    //     } else {
    //         throw new HttpException('Token not match', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async setCurrentRefreshToken(refreshToken: string, userId: number): Promise<UserTokenDTO> {
    //     try {
    //         const hashedRefreshToken: string = await bcrypt.hash(refreshToken, 10)
    //         let token = await this.userTokensRepository.findOne({ userId: userId, tokenType: TOKEN_TYPE.REFRESH_TOKEN });
    //         if (!token) {
    //             token = await this.userTokensRepository.create({
    //                 userId: userId,
    //                 tokenType: TOKEN_TYPE.REFRESH_TOKEN,
    //                 tokenValue: hashedRefreshToken,
    //             })

    //         } else {
    //             token.tokenValue = hashedRefreshToken
    //         }
    //         await this.userTokensRepository.save(token);
    //         const oUserToken: UserTokenEntity = await this.userTokensRepository.save(token);
    //         return toUserTokenDTO(oUserToken)
    //     } catch (error) {
    //         throw new Error('Failed to update refresh token')
    //     }

    // }

    // public async findByPayload({ email }: TJwtPayload): Promise<UserSimpleDTO | null> {
    //     const user = await this.userRepository.findOne({ where: { email } });
    //     if (user) {
    //         return toSimpleUserDto(user);
    //     }
    //     return null
    // }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user || null
    }

    public async findById(_id: number): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({ where: { _id } });
        return user || null
    }

    // public async findById(id: number): Promise<UserSimpleDTO | null> {
    //     const user = await this.userRepository.findOne({ where: { id } });
    //     if (user) toSimpleUserDto(user);
    //     return null
    // }
}
