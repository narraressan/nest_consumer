import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const { QUEUE_HOST, QUEUE_PORT, QUEUE_NAME } = process.env;
  console.log(`Consume from ${QUEUE_NAME} -> ${QUEUE_HOST}:${QUEUE_PORT}`);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
  });

  await app.listen();
}
bootstrap();
