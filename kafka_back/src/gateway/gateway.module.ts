import { Module } from '@nestjs/common';
import { EventsGateway } from './gateway';
import { MessageRepository } from 'src/db/message/message.repository';

@Module({
  imports: [],
  providers: [EventsGateway]
})
export class GatewayModule {}
