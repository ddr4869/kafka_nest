import { UserRepository } from '@db/user/user.repository';
import { CreateUserDto, SigninDto, FriendDto } from './user.dto';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as BcryptUtils from '@utils/bcrypt';
import { UserEntity } from '@db/user';
import { FriendRepository } from '@db/friend/friend.repository';
import { FriendEntity } from '@db/friend/friend.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly friendRepository: FriendRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signinDto: SigninDto){
    const user = await this.userRepository.findOne({
      where: {
        username:signinDto.username,
     }
    })
    if (!user) {
      throw new UnauthorizedException();
    }
    let valid = await BcryptUtils.isHashValid(signinDto.password, user?.password)

    if (!valid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username, role: user.role};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: {
        username: username,
      }
    });
  }

  async createUser(userDto: CreateUserDto): Promise<UserEntity | undefined> {
    let user = await this.userRepository.findOne({ where: { username: userDto.username } } )
    if (user) {
      throw new BadRequestException("User " + userDto.username + " already exists");
    }
    userDto.password = await BcryptUtils.hash(userDto.password)
    return this.userRepository.createUser(userDto);
  }

  async addFriend(userDto: FriendDto): Promise<FriendEntity | undefined> {
    let user = await this.userRepository.findOne({ where: { username: userDto.friend } } )
    if (!user) {
      throw new BadRequestException("User " + userDto.friend + " not found");
    }
    console.log("user !! : ", userDto.username, userDto.friend)
    let friend = await this.friendRepository.findOne({ where: { username: userDto.username, friend: userDto.friend } } )
    if (friend) {
      throw new BadRequestException("Already friends!");
    }
    return await this.friendRepository.addFriend(userDto);
  }
}

