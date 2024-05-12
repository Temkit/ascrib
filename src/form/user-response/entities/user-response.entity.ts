import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';

@Entity()
export class UserResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionId: number;

  @ManyToOne(() => Question, (question) => question.userResponses)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Column({ nullable: true })
  booleanAnswer?: boolean;

  @Column({ type: 'float', nullable: true })
  numberAnswer?: number;

  @Column({ type: 'date', nullable: true })
  dateAnswer?: Date;

  @Column({ nullable: true })
  textAnswer?: string;

  @Column({ nullable: true })
  choiceAnswerId?: number;

  @Column()
  responseDate: Date;
}
