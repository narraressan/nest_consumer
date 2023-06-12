import { ExampleEventProducerInput } from 'src/common/Message.dto';
import { MessageProcessor } from 'src/common/Message.processor';
import { cast } from 'src/common/utils';

describe('AppController (e2e)', () => {
  let processor: MessageProcessor;

  beforeEach(async () => {
    processor = new MessageProcessor();
  });

  it('test queue', async () => {
    const message = await cast(ExampleEventProducerInput, {
      text: 'testing',
      digits: 123,
    });
    expect(processor.processEvent(message)).toBeTruthy();
  });
});
