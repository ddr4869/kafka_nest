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
exports.BullProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const message_dto_1 = require("../entity/message/message.dto");
let BullProcessor = class BullProcessor {
    constructor() {
        this.count = 0;
    }
    async transcode(job) {
        console.log("transcode start...");
        const dto = new message_dto_1.MessageDto(job.data.message, job.data.writer);
        this.messageRepository.createMessage(dto);
        const resObj = JSON.parse(`{ "jobId": "${job.id}", "message": "${job.data}" }`);
        return { queue: resObj, data: job.data };
    }
    onActive(job) {
        console.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
    }
    onCompleted(job, result) {
        return job.returnvalue();
        console.log(`Completed job ${job.id} of type ${job.name} with result ${result}...`);
    }
    doSomething(data, i) {
        console.log(i);
    }
};
exports.BullProcessor = BullProcessor;
__decorate([
    (0, bull_1.Process)("transcode"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BullProcessor.prototype, "transcode", null);
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BullProcessor.prototype, "onActive", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BullProcessor.prototype, "onCompleted", null);
exports.BullProcessor = BullProcessor = __decorate([
    (0, bull_1.Processor)('audio')
], BullProcessor);
//# sourceMappingURL=processor.js.map