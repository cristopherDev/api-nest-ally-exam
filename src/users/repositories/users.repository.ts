import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(userDto: UserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);

    userDto.password = hashedPassword;

    return await this.save(userDto);
  }

  async getAllUsers(limit, offset) {
    const count = await this.count();

    const users: UserDto[] = await this.find({
      select: {
        id: true,
        name: true,
        email: true,
        last_login: true,
      },
      order: {
        id: 'DESC',
      },
      skip: offset,
      take: limit,
    });

    const usersResult = { "total_users": count, users };

    return usersResult;
  }
}
