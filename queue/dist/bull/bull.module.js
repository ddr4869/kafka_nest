"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullModule = void 0;
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const producers_1 = require("./producers");
const processor_1 = require("./processor");
let BullModule = class BullModule {
};
exports.BullModule = BullModule;
exports.BullModule = BullModule = __decorate([
    (0, common_1.Module)({
        imports: [app_module_1.AppModule],
        controllers: [],
        providers: [producers_1.BullProducer, processor_1.BullProcessor],
    })
], BullModule);
//# sourceMappingURL=bull.module.js.map