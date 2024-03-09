import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardRepository } from '@db/board/board.repository';
import { BoardController } from './board.controller';
import { HotBoardRepository } from '@db/hot_board/hotboard.repository';

@Module({
  imports : [],
  providers: [BoardService, BoardRepository, HotBoardRepository],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule {}
