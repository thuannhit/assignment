import { Transport } from '@nestjs/microservices';

export class ConfigService {

  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.tokenService = {
      options: {
        port: process.env.AUTH_SERVICE_PORT,
        host: process.env.AUTH_SERVICE_HOST
      },
      transport: Transport.TCP
    };
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT,
        host: process.env.USER_SERVICE_HOST
      },
      transport: Transport.TCP
    };
    this.envConfig.orderService = {
      options: {
        port: process.env.ORDER_SERVICE_PORT,
        host: process.env.ORDER_SERVICE_HOST
      },
      transport: Transport.TCP
    };
    this.envConfig.permissionService = {
      options: {
        port: process.env.PERMISSION_SERVICE_PORT,
        host: process.env.PERMISSION_SERVICE_HOST
      },
      transport: Transport.TCP
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
