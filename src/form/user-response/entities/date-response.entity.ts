import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserResponse } from './user-response.entity';

@Entity()
export class DateResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserResponse)
  @JoinColumn()
  userResponse: UserResponse;

  @Column('date')
  answer: Date; // This column stores the date response

  @Column()
  responseDate: Date;
}
