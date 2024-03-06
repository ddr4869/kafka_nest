import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "../../user/user.dto";
import { DataSource, Repository, FindOneOptions, FindManyOptions } from "typeorm";

@Injectable()
export class UserRepository extends Repository<UserEntity>{

    constructor(dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }
    
    async createUser(dto: CreateUserDto): Promise<any> {
        const entity: UserEntity = super.create(new UserEntity(dto.username, dto.password, dto.role));
        await super.save(entity);
        console.log("createMessage success!")
        return entity;
    }
}

