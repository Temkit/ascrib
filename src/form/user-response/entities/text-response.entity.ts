import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserResponse } from './user-response.entity';

@Entity()
export class TextResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserResponse)
  @JoinColumn()
  userResponse: UserResponse;

  @Column('text') // Use 'text' type to allow for longer string data which might not fit in standard 'varchar' type.
  answer: string;

  @Column()
  responseDate: Date;
}
