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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const producers_1 = require("./bull/producers");
const queue_request_1 = require("./bull/model/queue_request");
const message_repository_1 = require("./entity/message/message.repository");
const message_dto_1 = require("./entity/message/message.dto");
let AppController = class AppController {
    constructor(appService, messageRepository, bullProducer) {
        this.appService = appService;
        this.messageRepository = messageRepository;
        this.bullProducer = bullProducer;
    }
    getJob(id) {
        console.log("here");
        return this.bullProducer.getJob(id);
    }
    setJob(req) {
        return this.bullProducer.setJob(new queue_request_1.CreateQueue(req.name, req.data, new Date()));
    }
    getHello(foo) {
        console.log(foo);
        return this.appService.getHello();
    }
    getHello2(req) {
        console.log(req.query.foo);
        return this.appService.getHello();
    }
    async createMessage(message, writer) {
        return this.messageRepository.createMessage(new message_dto_1.MessageDto(message, writer));
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)("/get/:jobId"),
    __param(0, (0, common_1.Param)("jobId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getJob", null);
__decorate([
    (0, common_1.Get)("set"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "setJob", null);
__decorate([
    (0, common_1.Get)("hello"),
    __param(0, (0, common_1.Query)("foo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)("hello2"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello2", null);
__decorate([
    (0, common_1.Post)("hello3"),
    __param(0, (0, common_1.Body)("message")),
    __param(1, (0, common_1.Body)("writer")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createMessage", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        message_repository_1.MessageRepository,
        producers_1.BullProducer])
], AppController);
//# sourceMappingURL=app.controller.js.map