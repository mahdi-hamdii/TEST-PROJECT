import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { ProjectEntity } from './project.entity';
import { TicketEntity } from './ticket.entity';

@Entity('sprint')
export class SprintEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() dueDate?: Date;

  @ManyToOne((type) => ProjectEntity, { cascade: true })
  project?: ProjectEntity;

  @OneToMany((type) => TicketEntity, (ticket) => ticket.todo, { cascade: true })
  tickets?: TicketEntity[];
}
