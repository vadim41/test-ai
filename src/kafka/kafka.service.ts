import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class KafkaService {
  constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

  async send(name: string) {
    await lastValueFrom(this.client.emit('internal.test', { name }));
  }
}
