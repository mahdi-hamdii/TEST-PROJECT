import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { SprintEntity } from './sprint.entity';
  
  @Entity('task')
  export class TicketEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'varchar', nullable: false }) name: string;
    @CreateDateColumn() dueDate?: Date;
    @ManyToOne((type) => SprintEntity, (sprint) => sprint.tasks)
    sprint?: SprintEntity;
  }
  