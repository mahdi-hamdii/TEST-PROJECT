import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false, unique: true }) projectName: string;
  @CreateDateColumn() createdOn?: Date;
  @Column({ type: 'varchar', nullable: false, unique: true }) description: string;

}