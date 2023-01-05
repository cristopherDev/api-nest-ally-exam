import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', length: 90, unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  password: string;

  @Column({ type: 'timestamptz', nullable: true })
  last_login: Date;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
