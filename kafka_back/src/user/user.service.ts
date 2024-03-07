import { UserRepository } from '@db/user/user.repository';
import { CreateUserDto, SigninDto } from './user.dto';
import { ForbiddenException, Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFilter } from '@common/exception/http-exception.filter';

export type User = any;

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  
  async signIn(signinDto: SigninDto){
    console.log("signinDto: ", signinDto )
    const user = await this.userRepository.findOne({
      where: {
        username:signinDto.username,
     }}
     );

    if (user?.password !== signinDto.password) {
      throw new UnauthorizedException();
    }
    console.log("user name: ", user.username )
    const payload = { sub: user.id, username: user.username, role: user.role};
    console.log(payload)
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username: username,
      }
    });
  }

  async createUser(userDto: CreateUserDto): Promise<User | undefined> {
    return this.userRepository.createUser(userDto);
  }
}