import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { taskSchema } from '../schemas/task.schema';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.interface';
import { TaskDto } from './dto/task.dto';
import { tasksUser } from '../schemas/id-user.schema';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get(':user_id')
  async getAllTaskById(
    @Param(new JoiValidationPipe(tasksUser)) { user_id },
  ): Promise<Task[]> {
    try {
      return await this.taskService.getAllTaskById(user_id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post()
  async createTask(
    @Body(new JoiValidationPipe(taskSchema)) task: Task,
  ): Promise<TaskDto> {
    try {
      return await this.taskService.createTask(task);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
