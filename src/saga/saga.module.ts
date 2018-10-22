import { Module } from '@nestjs/common';
import { SagaService } from './saga.service';

@Module({
  imports: [],
  providers: [SagaService],
  exports: [SagaService],
})
export class SagaModule {}
