import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { SprintEntity } from './sprint.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @CreateDateColumn() createdOn?: Date;

  @ManyToOne((type) => SprintEntity, (sprint) => sprint.tasks)
  sprint?: SprintEntity;
}
