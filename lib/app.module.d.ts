import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
export declare class AppModule implements NestModule {
    private readonly appService;
    constructor(appService: AppService);
    configure(consumer: MiddlewareConsumer): void;
}
