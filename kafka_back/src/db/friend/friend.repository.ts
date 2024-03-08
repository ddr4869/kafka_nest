import { Injectable } from "@nestjs/common";
import { FriendDto, CreateUserDto } from "@user/user.dto";
import { DataSource, Repository, FindOneOptions, FindManyOptions } from "typeorm";
import { FriendEntity } from "./friend.entity";

@Injectable()
export class FriendRepository extends Repository<FriendEntity>{
    constructor(
            dataSource: DataSource,
        ) {
        super(FriendEntity, dataSource.createEntityManager());
    }
    
    async addFriend(dto: FriendDto): Promise<any> {
        const entity: FriendEntity = super.create(new FriendEntity(dto.username, dto.friend));
        await super.save(entity);
        return entity;
    }   

    async delFriend(dto: FriendDto): Promise<any> {
        const entity: FriendEntity = super.create(new FriendEntity(dto.username, dto.friend));
        await super.delete(entity);
        return entity;
    }

}

