import { Thunk } from 'ts-thunk';

import { IStoreEventType, IStoreEvent } from '../events/events.model';

export interface ISagaUpdateRequest {
  entity: string;
  entityId: string;
  input: { [key: string]: any };
}
export type ISagaHandler = Thunk<
  Promise<ISagaUpdateRequest | void>,
  IStoreEvent
>;
export type ISagaTaskHandler = Thunk<Promise<void>, IStoreEvent>;

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

export class Saga {
  constructor(private readonly sagas: ISaga[]) {}

  find(event: IStoreEvent): ISaga | null {
    for (let item of this.sagas) {
      const { entity, on, filter } = item;
      if (
        entity === event.entity &&
        on === event.type &&
        (!filter ||
          !filter.column ||
          (event.columns.indexOf(filter.column) !== -1 && !filter.value) ||
          event.data[filter.column] === filter.value)
      ) {
        return item;
      }
    }
    return null;
  }
}
