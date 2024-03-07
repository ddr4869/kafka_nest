import { Controller, Post, Body, Get, Req, UseGuards, HttpCode, HttpStatus, UseFilters, ForbiddenException, BadRequestException } from "@nestjs/common";
import { User, UserService } from "./user.service";
import { CreateUserDto, SigninDto } from "@db/user";
import { AuthGuard } from '@auth/auth.guard'
import { RolesGuard } from "@role/roles.guard";
import { Role } from "@role/role.enum";
import { Roles } from "@role/roles.decorator";

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
    getProfile(@Req() req: any):User {
        let user:User =  this.userService.findOne(req.query.username);
        if(user === undefined) {
            throw new BadRequestException();
        }
        return user;
    }

    @Post('create')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    creatgeUser(@Body() createDto: CreateUserDto ) {
        return this.userService.createUser(createDto);
    }
}