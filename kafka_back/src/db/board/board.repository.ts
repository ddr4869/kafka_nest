import { Injectable } from "@nestjs/common";
import { CreateBoardDto, DeleteBoardDto } from "@board/board.dto";
import { DataSource, Repository, FindOneOptions, FindManyOptions } from "typeorm";
import { BoardEntity } from "./board.entity";

@Injectable()
export class BoardRepository extends Repository<BoardEntity>{

    constructor(dataSource: DataSource) {
        super(BoardEntity, dataSource.createEntityManager());
    }
    
    async createBoard(dto: CreateBoardDto): Promise<any> {
        const entity: BoardEntity = super.create(new BoardEntity(dto.board_name, dto.board_admin, dto.board_password));
        await super.save(entity);
        return entity;
    }

    async getBoardByName(board_name: string): Promise<BoardEntity> {
        const options: FindOneOptions<BoardEntity> = {
            where: { board_name: board_name }
        }
        return await super.findOne(options);
    }

    async getBoardIdByName(board_name: string): Promise<number> {
        const options: FindOneOptions<BoardEntity> = {
            where: { board_name: board_name }
        }
        const board: BoardEntity = await super.findOne(options);
        return board.board_id;
    }

    async deleteBoard(board_id: number): Promise<any> {
        // delete board
        return await super.delete(board_id);
    }
}

