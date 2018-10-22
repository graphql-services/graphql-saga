import { Module } from '@nestjs/common';
import { PubSubFactory } from './pubsub.factory';

@Module({
  imports: [],
  providers: [PubSubFactory],
  exports: [PubSubFactory],
})
export class PubSubModule {}
