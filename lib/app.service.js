"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ts_thunk_1 = require("ts-thunk");
const graphql_request_1 = require("graphql-request");
const env_1 = require("env");
const saga_service_1 = require("./saga/saga.service");
const pubsub_factory_1 = require("./pubsub/pubsub.factory");
const logger_1 = require("./logger");
let AppService = class AppService {
    constructor(sagaService, pubsubFactory) {
        this.sagaService = sagaService;
        this.pubsubFactory = pubsubFactory;
        this.handleEvent = (event) => __awaiter(this, void 0, void 0, function* () {
            const handlers = this.sagaService.handlersForEvent(event);
            if (handlers) {
                logger_1.log(`handle event`, event);
                const { task, onSuccess, onError } = handlers;
                try {
                    yield ts_thunk_1.resolveThunk(task, event);
                    if (onSuccess) {
                        const updateRequest = yield ts_thunk_1.resolveThunk(onSuccess, event);
                        if (updateRequest) {
                            yield this.handleUpdateRequest(updateRequest);
                        }
                    }
                }
                catch (err) {
                    if (onError) {
                        const updateRequest = yield ts_thunk_1.resolveThunk(onError, event);
                        if (updateRequest) {
                            yield this.handleUpdateRequest(updateRequest);
                        }
                    }
                }
            }
        });
        this.handleUpdateRequest = (updateRequest) => __awaiter(this, void 0, void 0, function* () {
            logger_1.log(`handle update request`, updateRequest);
            try {
                const res = yield this.client.request(`mutation update${updateRequest.entity}(
          $id:ID!,
          $input:${updateRequest.entity}RawUpdateInput!
        ) {
          update${updateRequest.entity}(id:$id,input:$input){
            id
          }
        }`, { input: updateRequest.input, id: updateRequest.entityId });
                global.console.log('handle update request', updateRequest, res);
            }
            catch (err) {
                global.console.log('failed to handle update request', updateRequest, err);
            }
        });
        this.pubsubService = pubsubFactory.getService(this.handleEvent);
        this.client = new graphql_request_1.GraphQLClient(env_1.ENV.API_URL);
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [saga_service_1.SagaService,
        pubsub_factory_1.PubSubFactory])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map