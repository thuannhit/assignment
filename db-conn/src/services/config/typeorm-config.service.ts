import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from './config.service'
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor() {
     }
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const configService= new ConfigService()
        console.log('PORT', configService.get('mysqlPort'))
        console.log('HOST', configService.get('mysqlHost'))
        console.log('mysqlPassword', configService.get('mysqlPassword'))
        console.log('mysqlDBName', configService.get('mysqlDBName'))
        return {
            type: 'mysql',
            host: configService.get('mysqlHost'),
            port: Number(configService.get('mysqlPort')),
            username: configService.get('mysqlUserName'),
            password: configService.get('mysqlPassword'),
            database: configService.get('mysqlDBName'),
            // "entities": ['dist/**/*.entity{.ts,.js }'],
            entities: ["dist/**/*.entity.js"],
            // ! ALWAYS FALSE IN PROD
            // synchronize: !(process.env.NODE_ENV.trim() === 'production'),
            // entities: [join(__dirname, '**', `*.entity.{ts,js}`)],
            // entities: ['src' + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }
}