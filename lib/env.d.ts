interface IENV {
    PORT: number | string;
    DEBUG: boolean;
    NODE_ENV: string;
    NSQ_URL: string;
    API_URL: string;
    SENTRY_DNS?: string;
}
export declare const ENV: IENV;
export {};
