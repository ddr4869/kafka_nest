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
exports.BullProducer = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
let BullProducer = class BullProducer {
    constructor(audioQueue) {
        this.audioQueue = audioQueue;
    }
    async setJob(data) {
        console.log("data: ", data.data);
        console.log("name: ", data.name);
        try {
            const job = await this.audioQueue.add("transcode", {
                data: data,
            });
            if (job?.id === undefined) {
                throw new Error('Save event data job ID not available');
            }
            console.log('Job DATA:', job.data);
            return { job_id: job.id, job_data: job.data };
        }
        catch (error) {
            console.log(error);
        }
    }
    async finishJob() {
        try {
            const job = await this.audioQueue.add("transcode", {
                foo: 'bar',
            });
            if (job?.id === undefined) {
                throw new Error('Save event data job ID not available');
            }
            if (job?.id === undefined) {
                throw new Error('Save event data job ID not available');
            }
            const result = await job.finished();
            console.log('Job DATA:', result);
            return { job_data: result };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getJob(jobId) {
        console.log('Job ID:', jobId);
        try {
            const job = await this.audioQueue.getJob(jobId);
            if (job?.id === undefined) {
                throw new Error('Save event data job ID not available');
            }
            console.log('Job DATA:', job.data);
            return { job_data: job.data };
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.BullProducer = BullProducer;
exports.BullProducer = BullProducer = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('audio')),
    __metadata("design:paramtypes", [Object])
], BullProducer);
//# sourceMappingURL=producers.js.map