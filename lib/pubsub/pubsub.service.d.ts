import { IStoreEvent } from '../events/events.model';
interface PubSubServiceConfig {
    url: string;
    handler: (event: IStoreEvent) => Promise<void>;
}
export declare class PubSubService {
    private readonly config;
    private reader?;
    constructor(config: PubSubServiceConfig);
    ensureReader(): Promise<void>;
}
export {};
