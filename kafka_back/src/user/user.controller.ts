import { Controller, Post, Body, Get, Req, UseGuards, HttpCode, HttpStatus, UseFilters, ForbiddenException, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { UserService } from "./user.service";
import { FriendDto, CreateUserDto, SigninDto, UserEntity } from "@db/user";
import { AuthGuard } from '@auth/auth.guard'
import { RolesGuard } from "@role/roles.guard";
import { Role } from "@role/role.enum";
import { Roles } from "@role/roles.decorator";
import * as bcrypt from 'bcrypt';
import { FriendEntity } from "@db/friend/friend.entity";
@Controller("user")
@Roles(Role.User)
export class UserController {
    constructor(
        private readonly userService: UserService        
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SigninDto) {   
        return this.userService.signIn(signInDto);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Req() req: any):Promise<UserEntity> {
        let user:UserEntity =  await this.userService.findOne(req.query.username);
        if(user === undefined) {
            throw new BadRequestException();
        }
        return user;
    }

    @UseGuards(AuthGuard)
    @Post('friend/add')
    async addFriends(@Req() req: any, @Body() dto: FriendDto ):Promise<FriendEntity> {
        dto.username = req.user.username;
        console.log("dto.username: ", dto.username)
        console.log("dto.friend: ", dto.friend)
        let friend:FriendEntity =  await this.userService.addFriend(dto);
        return friend;
    }


    @Post('create')
    //@Roles(Role.Admin)
    //@UseGuards(AuthGuard, RolesGuard)
    creatgeUser(@Body() createDto: CreateUserDto ) {
        return this.userService.createUser(createDto);
    }
}