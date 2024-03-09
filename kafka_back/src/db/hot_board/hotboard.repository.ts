import { Injectable } from "@nestjs/common";
import { CreateBoardDto, CreateRecommendBoardDto, DeleteBoardDto } from "@board/board.dto";
import { DataSource, Repository, FindOneOptions, FindManyOptions } from "typeorm";
import { HotBoardEntity } from "./hotboard.entity";

@Injectable()
export class HotBoardRepository extends Repository<HotBoardEntity>{

    constructor(dataSource: DataSource) {
        super(HotBoardEntity, dataSource.createEntityManager());
    }
    
    async createRecommendBoard(dto: CreateRecommendBoardDto): Promise<any> {
        const entity: HotBoardEntity = super.create(new HotBoardEntity(dto.board_id, dto.board_star));
        await super.save(entity);
        return entity;
    }

    async deleteRecommendBoard(board_id: number): Promise<any> {
        // delete board
        return await super.delete(board_id);
    }
}

