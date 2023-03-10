import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TaskRepository } from './repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  createTask(taskDto: TaskDto) {
    return this.taskRepository.createTask(taskDto);
  }

  getAllTaskById(user_id: number) {
    return this.taskRepository.getAllTaskByUserId(user_id);
  }
}
