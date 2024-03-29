import { Controller, Post, Body, Get, Req, UseGuards, Delete, UsePipes, ValidationPipe } from "@nestjs/common";

import { AuthGuard } from '@auth/auth.guard'
import { RolesGuard } from "@role/roles.guard";
import { Role } from "@role/role.enum";
import { Roles } from "@role/roles.decorator";
import * as bcrypt from 'bcrypt';
import { FriendEntity } from "@db/friend/friend.entity";
import { BoardService } from "./board.service";
import { CreateBoardDto, DeleteBoardDto, RecommendBoardDto } from "./board.dto";
@Controller("board")
@Roles(Role.User)
export class BoardController {
    constructor(
        private readonly boardService: BoardService  
    ) {}

    @Post('create')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    creatgeBoard(@Req() request, @Body() createDto: CreateBoardDto ) {
        createDto.board_admin = request.user.username
        return this.boardService.createBoard(createDto);
    }

    @Get('')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    getBoards(@Req() req: any) {
        return this.boardService.getBoards();
    }


    @Post('recommend')
    recommendBoard(@Body() recommendDto: RecommendBoardDto) {
        console.log("recommendDto: ", recommendDto)
        return this.boardService.recommendBoard(recommendDto);
    }

    @Delete('delete')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    deleteBoard(@Body() deleteDto: DeleteBoardDto ) {
        return this.boardService.deleteBoard(deleteDto);
    }
}