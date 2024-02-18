import { Module } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { BullProducer } from "./producers";
import { BullProcessor } from "./processor";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [AppModule],
    controllers: [],
    providers: [BullProducer, BullProcessor],
})

export class BullModule {}