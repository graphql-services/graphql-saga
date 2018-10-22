import { Injectable } from '@nestjs/common';

import { ENV } from '../env';
import { PubSubService } from './pubsub.service';
import { IStoreEvent } from '../events/events.model';

@Injectable()
export class PubSubFactory {
  isServiceEnabled(): boolean {
    return !!ENV.NSQ_URL;
  }

  getService(handler: (event: IStoreEvent) => Promise<void>): PubSubService {
    return new PubSubService({
      url: ENV.NSQ_URL,
      handler,
    });
  }
}
