import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { ChoiceResponse } from './choice-response.entity';

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

  @OneToMany(
    () => ChoiceResponse,
    (choiceResponse) => choiceResponse.userResponse,
  )
  choiceResponses: ChoiceResponse[];

  @Column()
  responseDate: Date;
}
