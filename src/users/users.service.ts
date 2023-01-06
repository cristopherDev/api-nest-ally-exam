import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  creteUser(userDto: UserDto) {
    return this.userRepository.createUser(userDto);
  }

  getAllUser(limit, offset) {
    return this.userRepository.getAllUsers(limit, offset);
  }
}
