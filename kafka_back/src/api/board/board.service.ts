import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import * as BcryptUtil from '@utils/bcrypt';
import * as bcrypt from 'bcrypt';

import { BoardRepository } from '@db/board/board.repository';
import { CreateBoardDto } from './board.dto';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
  ) {}


  async createBoard(boardDto: CreateBoardDto): Promise<BoardRepository | undefined> {
    boardDto.board_password = await BcryptUtil.hash(boardDto.board_password)
    return this.boardRepository.createBoard(boardDto);
  }

  hash = async (plainText: string): Promise<string> => {
    const saltOrRounds = 10;
    let result = await bcrypt.hash(plainText, saltOrRounds)
    return result;
  };

  isHashValid = (password, hashPassword): Promise<boolean> => {
    let result = bcrypt.compare(password, hashPassword);
    return result;
  };
}

