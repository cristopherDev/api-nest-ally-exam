import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { taskSchema } from '../schemas/task.schema';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.interface';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  async createTask(
    @Body(new JoiValidationPipe(taskSchema)) task: Task,
  ): Promise<TaskDto> {
    try {
      return await this.taskService.createTask(task);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
