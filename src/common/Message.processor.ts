import { cast } from './utils';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { chunk } from 'lodash';
import { ExampleEventProducerInput } from './Message.dto';

@Injectable()
export class MessageProcessor implements OnModuleInit, OnModuleDestroy {
  queue = null;
  isAlive = true;

  async onModuleInit() {
    this.queue = new Redis({
      host: 'localhost',
      port: 6379,
    });
    await this.readMessages();
  }

  onModuleDestroy() {
    this.queue.quit();
  }

  private async readMessages(lastId = '$') {
    console.log(`Start reading messages`);
    const response = await this.queue.xread(
      'BLOCK',
      0,
      'COUNT',
      1,
      'STREAMS',
      'event_driven_demo',
      lastId,
    );
    const messages = response?.[0]?.[1] || [];
    let lastKey = lastId;
    for await (const message of messages) {
      lastKey = message[0];
      const rawData = Object.assign(
        {},
        ...chunk(message[1], 2)?.map((nth: Array<any>) => {
          return { [nth[0]]: nth[1] };
        }),
      );
      const event = await cast(ExampleEventProducerInput, {
        text: rawData.text,
        digits: parseFloat(rawData.digits),
      });
      await this.processEvent(event);
    }
    if (this.isAlive) await this.readMessages(lastKey);
  }

  private async processEvent(event: ExampleEventProducerInput) {
    console.log(`Received: ${JSON.stringify(event)}`);

    // TODO
    console.log(event);
  }
}
