import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TestDto } from '../dto/test.dto';

@Controller()
export class KafkaConsumer {
  private readonly logger = new Logger(KafkaConsumer.name);

  @MessagePattern('internal.test')
  handleMessage(@Payload() message: TestDto) {
    this.logger.log(`Received message: ${JSON.stringify(message)}`);
  }
}
