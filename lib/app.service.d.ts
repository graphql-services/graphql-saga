import { GraphQLClient } from 'graphql-request';
import { SagaService } from './saga/saga.service';
import { PubSubFactory } from './pubsub/pubsub.factory';
import { PubSubService } from './pubsub/pubsub.service';
export declare class AppService {
    private readonly sagaService;
    private pubsubFactory;
    pubsubService: PubSubService;
    client: GraphQLClient;
    constructor(sagaService: SagaService, pubsubFactory: PubSubFactory);
    private handleEvent;
    private handleUpdateRequest;
}
