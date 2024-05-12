import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserResponse } from './user-response.entity';

@Entity()
export class NumberResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserResponse)
  @JoinColumn()
  userResponse: UserResponse;

  @Column('double precision') // This type may vary depending on your database; for example, you might use 'float' or 'decimal'.
  answer: number;

  @Column()
  responseDate: Date;
}
