import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationValidationPipe } from '../pipes/pagination-validation.pipe';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { userSchema } from '../schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(
    @Query('limit', PaginationValidationPipe) limit?: number,
    @Query('offset', PaginationValidationPipe) offset?: number,
  ) {
    try {
      return await this.usersService.getAllUser(limit, offset);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post()
  async createUser(
    @Body(new JoiValidationPipe(userSchema)) user: User,
  ): Promise<UserDto> {
    try {
      return await this.usersService.creteUser(user);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
  }
}
