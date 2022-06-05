import { TaskEntity } from './task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { DeveloperEntity } from './developer.entity';

@Entity('sprint')
export class SprintEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;

  @ManyToOne((type) => DeveloperEntity, { cascade: true })
  owner?: DeveloperEntity;

  @OneToMany((type) => TaskEntity, (task) => task.sprint, { cascade: true })
  tasks?: TaskEntity[];
}
