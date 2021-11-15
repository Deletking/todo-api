import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: todoStatus;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  user: UserEntity

  @Column()
  userId: number;

}
export enum todoStatus {
  OPEN = 'OPEN',
  WIP = 'WIP',
  COMPLETED = 'COMPLETED',
}
