import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Roles } from '../role/roles.decorator';
import { Role } from '../role/role.enum';
import { RolesGuard } from '../role/roles.guard';
@Controller('auth')
@Roles(Role.User)
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('test1')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  test1(@Request() req) {
    console.log("test1: ", req.user);
  }

  @Post('test2')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  test2(@Request() req) {
  }
}