import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from '../config/config';
import { MessageRepository } from './message/message.repository';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DBHOST,
      port: config.DBPORT,
      username: config.DBUSER,
      password: config.DBPWD,
      database: config.DBNAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [MessageRepository],
})
export class DbModule {}
