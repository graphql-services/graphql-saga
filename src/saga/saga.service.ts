import { Injectable } from '@nestjs/common';
import { resolveThunk } from 'ts-thunk';

import { IStoreEvent } from '../events/events.model';
import { ISagaHandler, Saga, ISagaTaskHandler } from './saga.model';

@Injectable()
export class SagaService {
  saga: Saga;

  constructor() {
    // global.console.log(process.cwd() + '/saga.ts');
    this.saga = new Saga(require(process.cwd() + '/saga.ts'));
  }

  handlersForEvent(
    event: IStoreEvent,
  ): {
    task: ISagaTaskHandler;
    onSuccess?: ISagaHandler;
    onError?: ISagaHandler;
  } | null {
    const saga = this.saga.find(event);

    if (saga) {
      return {
        task: resolveThunk(saga.handler, event),
        onSuccess: resolveThunk(saga.onSuccess, event),
        onError: resolveThunk(saga.onError, event),
      };
    }

    return null;
  }
}
