import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(creatUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(creatUserDto.password, salt);

    creatUserDto.password = hashedPassword;

    return await this.save(creatUserDto);
  }
}
