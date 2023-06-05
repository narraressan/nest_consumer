import { IsNumber, IsString } from 'class-validator';

export class ExampleEventProducerInput {
  @IsString()
  text: string;

  @IsNumber()
  digits: number;
}
