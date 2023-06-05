import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessageProcessor } from './common/Message.processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [MessageProcessor],
})
export class AppModule {}
