import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserResponse } from './user-response.entity';

@Entity()
export class BooleanResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserResponse)
  @JoinColumn()
  userResponse: UserResponse;

  @Column()
  answer: boolean; // This column stores the boolean response

  @Column()
  responseDate: Date;
}
