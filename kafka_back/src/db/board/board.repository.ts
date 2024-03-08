import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "@board/board.dto";
import { DataSource, Repository, FindOneOptions, FindManyOptions } from "typeorm";
import { BoardEntity } from "./board.entity";

@Injectable()
export class BoardRepository extends Repository<BoardEntity>{

    constructor(dataSource: DataSource) {
        super(BoardEntity, dataSource.createEntityManager());
    }
    
    async createBoard(dto: CreateBoardDto): Promise<any> {
        const entity: BoardEntity = super.create(new BoardEntity(dto.name, dto.board_admin, dto.board_password));
        await super.save(entity);
        return entity;
    }
}

