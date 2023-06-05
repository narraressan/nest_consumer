import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import { Transport } from '@nestjs/microservices';
import { QUEUE_NAME } from './common/utils';

async function bootstrap() {
  const { QUEUE_HOST, QUEUE_PORT } = process.env;
  console.log(`Subscribed to ${QUEUE_NAME} -> ${QUEUE_HOST}:${QUEUE_PORT}`);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: QUEUE_HOST,
      port: parseInt(QUEUE_PORT),
    },
  });

  await app.listen();
}
bootstrap();
