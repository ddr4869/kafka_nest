"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const bull_1 = require("@nestjs/bull");
const config = require("./config/config");
const producers_1 = require("./bull/producers");
const processor_1 = require("./bull/processor");
const path_1 = require("path");
const entity_module_1 = require("./entity/entity.module");
const message_repository_1 = require("./entity/message/message.repository");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.forRoot({
                redis: {
                    host: config.REDISHOST,
                    port: config.REDISPORT,
                    password: config.REDISPWD,
                },
            }),
            bull_1.BullModule.registerQueue({
                name: 'audio',
                processors: [(0, path_1.join)(__dirname, 'bull', 'processor.js')],
            }),
            entity_module_1.EntityModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, message_repository_1.MessageRepository, producers_1.BullProducer, processor_1.BullProcessor],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map