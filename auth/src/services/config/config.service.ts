import { Transport } from '@nestjs/microservices';

export class ConfigService {

  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.AUTH_SERVICE_PORT,
      accessSecretKey: process.env.JWT_ACCESS_SECRET,
      accessExpirationTime: process.env.JWT_ACCESS_EXPIRATION_TIME,
      refreshSecretKey: process.env.JWT_REFRESH_SECRET,
      refreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
    };
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT,
        host: process.env.USER_SERVICE_HOST
      },
      transport: Transport.TCP
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
