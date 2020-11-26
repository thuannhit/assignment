import {Injectable} from '@nestjs/common'

@Injectable()
export class ConfigService {

  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.DB_CONN_PORT
    };
    this.envConfig.mysqlHost = process.env.MYSQL_HOST;
    this.envConfig.mysqlPort = process.env.MYSQL_PORT;
    this.envConfig.mysqlDBName = process.env.MYSQL_DATABASE;
    this.envConfig.mysqlUserName = process.env.MYSQL_USER;
    this.envConfig.mysqlPassword = process.env.MYSQL_PASSWORD;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
