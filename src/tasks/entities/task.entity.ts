import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  task: string;

  @Column({ type: 'boolean', default: false })
  done: boolean = false;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  update_at: Date;

  @Column()
  user_id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  public user: UserEntity;
}
