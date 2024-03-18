import { Injectable } from "@nestjs/common";
import { CreateBoardDto, CreateRecommendBoardDto, DeleteBoardDto } from "@board/board.dto";
import { DataSource, Repository, FindOneOptions, FindManyOptions } from "typeorm";
import { HotBoardEntity } from "./hotboard.entity";
import { BoardEntity } from "@db/board/board.entity";

@Injectable()
export class HotBoardRepository extends Repository<HotBoardEntity>{

    constructor(dataSource: DataSource) {
        super(HotBoardEntity, dataSource.createEntityManager());
    }
    

    async createRecommendBoard(board :BoardEntity): Promise<any> {
        let hotBoard = new HotBoardEntity();
        hotBoard.Board = board;
        const entity: HotBoardEntity = super.create(hotBoard);
        await super.save(entity);
        return entity;
    }

    async deleteRecommendBoard(board_id: number): Promise<any> {
        // delete board
        return await super.delete(board_id);
    }
}

