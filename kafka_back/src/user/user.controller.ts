import { Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UsersController {
    constructor(
        private readonly UserService: UserService
    ) {}

    // @Post('create')
    // creatgeUser(req: ) {
    //     return this.UserService.createUser();
    // }
}