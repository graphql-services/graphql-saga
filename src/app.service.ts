import { Injectable } from '@nestjs/common';
import { resolveThunk } from 'ts-thunk';
import { GraphQLClient } from 'graphql-request';
import { ENV } from 'env';

import { SagaService } from './saga/saga.service';
import { PubSubFactory } from './pubsub/pubsub.factory';
import { PubSubService } from './pubsub/pubsub.service';
import { IStoreEvent } from './events/events.model';
import { ISagaUpdateRequest } from './saga/saga.model';
import { log } from './logger';

@Injectable()
export class AppService {
  pubsubService: PubSubService;
  client: GraphQLClient;

  constructor(
    private readonly sagaService: SagaService,
    private pubsubFactory: PubSubFactory,
  ) {
    this.pubsubService = pubsubFactory.getService(this.handleEvent);
    this.client = new GraphQLClient(ENV.API_URL);
  }

  private handleEvent = async (event: IStoreEvent) => {
    const handlers = this.sagaService.handlersForEvent(event);

    if (handlers) {
      log(`handle event`, event);

      const { task, onSuccess, onError } = handlers;
      try {
        await resolveThunk(task, event);
        if (onSuccess) {
          const updateRequest = await resolveThunk(onSuccess, event);
          if (updateRequest) {
            await this.handleUpdateRequest(updateRequest);
          }
        }
      } catch (err) {
        if (onError) {
          const updateRequest = await resolveThunk(onError, event);
          if (updateRequest) {
            await this.handleUpdateRequest(updateRequest);
          }
        }
      }
    }
  };

  private handleUpdateRequest = async (
    updateRequest: ISagaUpdateRequest,
  ): Promise<any> => {
    log(`handle update request`, updateRequest);
    try {
      const res = await this.client.request(
        `mutation update${updateRequest.entity}(
          $id:ID!,
          $input:${updateRequest.entity}RawUpdateInput!
        ) {
          update${updateRequest.entity}(id:$id,input:$input){
            id
          }
        }`,
        { input: updateRequest.input, id: updateRequest.entityId },
      );
      global.console.log('handle update request', updateRequest, res);
    } catch (err) {
      global.console.log('failed to handle update request', updateRequest, err);
    }
  };
}
