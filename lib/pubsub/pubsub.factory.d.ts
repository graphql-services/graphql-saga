import { PubSubService } from './pubsub.service';
import { IStoreEvent } from '../events/events.model';
export declare class PubSubFactory {
    isServiceEnabled(): boolean;
    getService(handler: (event: IStoreEvent) => Promise<void>): PubSubService;
}
