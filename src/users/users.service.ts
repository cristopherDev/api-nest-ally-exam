import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  creteUser(creatUserDto: CreateUserDto) {
    return this.userRepository.createUser(creatUserDto);
  }
}
