import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { AuthModule } from './auth.module';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const port = (new ConfigService()).get('port')
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port
    }
  } as TcpOptions);
  await app.listenAsync().then(() => { console.log('auth service is running at' + port)});
}
bootstrap();
