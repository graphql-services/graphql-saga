import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { SagaModule } from './saga/saga.module';
import { PubSubModule } from './pubsub/pubsub.module';

@Module({
  imports: [SagaModule, PubSubModule],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly appService: AppService) {}

  configure(consumer: MiddlewareConsumer) {}
}
