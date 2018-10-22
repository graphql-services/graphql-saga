import * as nsq from 'nsqjs';

import { log } from '../logger';
import { IStoreEvent } from '../events/events.model';

interface PubSubServiceConfig {
  url: string;
  handler: (event: IStoreEvent) => Promise<void>;
}

export class PubSubService {
  private reader?: any;

  constructor(private readonly config: PubSubServiceConfig) {
    this.ensureReader();
  }

  async ensureReader() {
    if (!this.reader && this.config.url) {
      this.reader = new nsq.Reader('es-event', 'saga', {
        lookupdHTTPAddresses: this.config.url.split(','),
        maxAttempts: 5,
      });

      this.reader.on('message', async msg => {
        try {
          const event = JSON.parse(msg.body.toString()) as IStoreEvent;
          await this.config.handler(event);
          msg.finish();
        } catch (e) {
          log(`failed to process event ${msg.body.toString()},error: ${e}`);
          msg.requeue(0);
        }
      });

      this.reader.connect();
    }
  }
}
