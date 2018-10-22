import { ISaga } from '../src/saga/saga.model';
import { IStoreEvent, IStoreEventType } from '../src/events/events.model';

const sagas: ISaga[] = [
  {
    entity: 'User',
    on: IStoreEventType.UPDATED,
    filter: {
      column: 'firstname',
    },
    handler: (event: IStoreEvent): Promise<void> => {
      return new Promise<void>(resolve => {
        setTimeout(resolve, 3000);
      });
    },
    onSuccess: async (event: IStoreEvent) => {
      return {
        entity: 'User',
        entityId: event.entityId,
        input: { firstname: 'john.doe' },
      };
    },
  },
];

module.exports = sagas;
