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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ts_thunk_1 = require("ts-thunk");
const saga_model_1 = require("./saga.model");
let SagaService = class SagaService {
    constructor() {
        this.saga = new saga_model_1.Saga(require(process.cwd() + '/saga.ts'));
    }
    handlersForEvent(event) {
        const saga = this.saga.find(event);
        if (saga) {
            return {
                task: ts_thunk_1.resolveThunk(saga.handler, event),
                onSuccess: ts_thunk_1.resolveThunk(saga.onSuccess, event),
                onError: ts_thunk_1.resolveThunk(saga.onError, event),
            };
        }
        return null;
    }
};
SagaService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SagaService);
exports.SagaService = SagaService;
//# sourceMappingURL=saga.service.js.map