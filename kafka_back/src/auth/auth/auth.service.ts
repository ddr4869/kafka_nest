import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<{access_token: string}> {
    const user = await this.UserService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username, roles: user.roles};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.UserService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log("password: ", password)
      console.log("result: ", result)
      return result;
    }
    return null;
  }
}