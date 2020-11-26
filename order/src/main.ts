import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrderModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: (new ConfigService()).get('port')
    }
  } as TcpOptions);
  await app.listenAsync();
}
bootstrap();
