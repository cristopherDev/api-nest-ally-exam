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

  private async checkUserExists(email: string): Promise<UserEntity> {
    const findEmail: UserEntity = await this.findOne({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });

    return findEmail;
  }

  async getAllUsers(limit: number, offset: number) {
    const count: number = await this.count();

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

    const usersResult = { total_users: count, users };

    return usersResult;
  }

  async createUser(userDto: UserDto): Promise<UserEntity> {
    const checkResult: unknown = await this.checkUserExists(userDto.email);

    if (!checkResult) {
      const salt = await bcrypt.genSalt();
      const hashedPassword: string = await bcrypt.hash(userDto.password, salt);

      userDto.password = hashedPassword;

      return await this.save(userDto);
    }

    throw new Error('User already exists');
  }
}
