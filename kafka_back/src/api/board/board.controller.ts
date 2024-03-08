import { Controller, Post, Body, Get, Req, UseGuards, HttpCode, HttpStatus, UseFilters, ForbiddenException, BadRequestException, InternalServerErrorException } from "@nestjs/common";

import { AuthGuard } from '@auth/auth.guard'
import { RolesGuard } from "@role/roles.guard";
import { Role } from "@role/role.enum";
import { Roles } from "@role/roles.decorator";
import * as bcrypt from 'bcrypt';
import { FriendEntity } from "@db/friend/friend.entity";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./board.dto";
@Controller("board")
@Roles(Role.User)
export class BoardController {
    constructor(
        private readonly boardService: BoardService  
    ) {}

    @Post('create')
    creatgeBoard(@Body() createDto: CreateBoardDto ) {
        return this.boardService.createBoard(createDto);
    }
}