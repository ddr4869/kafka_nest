import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import * as BcryptUtil from '@utils/bcrypt';
import * as bcrypt from 'bcrypt';

import { BoardRepository } from '@db/board/board.repository';
import { BoardResultDto, CreateBoardDto, CreateRecommendBoardDto, DeleteBoardDto, RecommendBoardDto } from './board.dto';
import { HotBoardRepository } from '@db/hot_board/hotboard.repository';
import { BoardEntity } from '@db/board/board.entity';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly hotBoardRepository: HotBoardRepository,
  ) {}


  async createBoard(boardDto: CreateBoardDto): Promise<BoardRepository | undefined> {
    boardDto.board_password = await BcryptUtil.hash(boardDto.board_password)
    return this.boardRepository.createBoard(boardDto);
  }

  async getBoards(): Promise<BoardEntity[] | undefined> {
    return this.boardRepository.find(
      // order by board_id
      { order: { board_id: "ASC" } }
    );
  }

  async recommendBoard(boardDto: RecommendBoardDto): Promise<any> {
    console.log("boardDto.board_id -> : ", boardDto.board_id)
    let board = await this.boardRepository.findOne({ where: { board_id: boardDto.board_id } });
    if (!board) {
      throw new BadRequestException("Board not found");
    }
    board.board_star += 1;
    this.boardRepository.save(board);

    if (board.board_star == 10) {
      // hot board
      this.hotBoardRepository.createRecommendBoard(board);
    }

    return new BoardResultDto(
      board.board_id,
      board.board_name,
      board.board_admin,
      board.board_star
    )
  }

  async deleteBoard(boardDto: DeleteBoardDto): Promise<BoardRepository | undefined> {
    let board = await this.boardRepository.findOne({ where: { board_id: boardDto.board_id, board_admin: boardDto.board_admin } } )
    if (!board) {
      console.log("Board not found")
      throw new BadRequestException("Board not found");
    }

    let valid = await BcryptUtil.isHashValid(boardDto.board_password, board.board_password)
     if (!valid) {
       throw new UnauthorizedException("Invalid password");
     }
    return this.boardRepository.deleteBoard(boardDto.board_id);
  }
}

