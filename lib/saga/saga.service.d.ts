import { IStoreEvent } from '../events/events.model';
import { ISagaHandler, Saga, ISagaTaskHandler } from './saga.model';
export declare class SagaService {
    saga: Saga;
    constructor();
    handlersForEvent(event: IStoreEvent): {
        task: ISagaTaskHandler;
        onSuccess?: ISagaHandler;
        onError?: ISagaHandler;
    } | null;
}
