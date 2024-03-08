import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardRepository } from '@db/board/board.repository';
import { BoardController } from './board.controller';

@Module({
  imports : [],
  providers: [BoardService, BoardRepository],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule {}
