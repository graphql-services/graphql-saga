import { Thunk } from 'ts-thunk';
import { IStoreEventType, IStoreEvent } from '../events/events.model';
export interface ISagaUpdateRequest {
    entity: string;
    entityId: string;
    input: {
        [key: string]: any;
    };
}
export declare type ISagaHandler = Thunk<Promise<ISagaUpdateRequest | void>, IStoreEvent>;
export declare type ISagaTaskHandler = Thunk<Promise<void>, IStoreEvent>;
export interface ISaga {
    entity: string;
    on: IStoreEventType;
    filter?: {
        column?: string;
        value?: string;
    };
    handler: ISagaTaskHandler;
    onSuccess?: ISagaHandler;
    onError?: ISagaHandler;
}
export declare class Saga {
    private readonly sagas;
    constructor(sagas: ISaga[]);
    find(event: IStoreEvent): ISaga | null;
}
