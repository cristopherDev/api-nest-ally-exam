import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { userSchema } from '../schemas/user.schema';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body(new JoiValidationPipe(userSchema)) user: User) {
    try {
        return await this.usersService.creteUser(user);
    } catch (error) {
        throw new ConflictException(error.driverError.detail)
    }
  }
}
