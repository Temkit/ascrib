import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserResponse } from './user-response.entity';
import { AnswerOption } from '../../question/entities/answer-option.entity';

@Entity()
export class ChoiceResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserResponse, (userResponse) => userResponse.choiceResponses)
  @JoinColumn()
  userResponse: UserResponse;

  @ManyToOne(() => AnswerOption, (answerOption) => answerOption.choiceResponses)
  @JoinColumn()
  answerOption: AnswerOption;

  @Column()
  selected: boolean;

  @Column()
  responseDate: Date;
}
