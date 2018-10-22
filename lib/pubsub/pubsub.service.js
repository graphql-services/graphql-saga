"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nsq = require("nsqjs");
const logger_1 = require("../logger");
class PubSubService {
    constructor(config) {
        this.config = config;
        this.ensureReader();
    }
    ensureReader() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.reader && this.config.url) {
                this.reader = new nsq.Reader('es-event', 'saga', {
                    lookupdHTTPAddresses: this.config.url.split(','),
                    maxAttempts: 5,
                });
                this.reader.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const event = JSON.parse(msg.body.toString());
                        yield this.config.handler(event);
                        msg.finish();
                    }
                    catch (e) {
                        logger_1.log(`failed to process event ${msg.body.toString()},error: ${e}`);
                        msg.requeue(0);
                    }
                }));
                this.reader.connect();
            }
        });
    }
}
exports.PubSubService = PubSubService;
//# sourceMappingURL=pubsub.service.js.map