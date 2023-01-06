import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async createTask(taskDto: TaskDto) {
    return await this.save(taskDto);
  }

  async getAllTaskByUserId(user_id: number) {
    return await this.find({ where: {
      user_id
    } });
  }
}
