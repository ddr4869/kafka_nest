import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@auth/auth.guard';
import { AuthService } from '@auth/auth.service';
import { Role, Roles, RolesGuard } from '@role';

@Roles(Role.User)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
    ) {}

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