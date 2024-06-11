// src/question/entities/answer-option.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { ChoiceResponse } from './../../user-response/entities/choice-response.entity';

@Entity()
export class AnswerOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({
    type: 'enum',
    enum: ['boolean', 'choice', 'text', 'number', 'date'],
    default: 'text',
  })
  type: string;

  @Column({ type: 'text', nullable: true })
  possibleValues: string; // JSON array of possible values, only used if type is 'choice'

  @ManyToOne(() => Question, (question) => question.answerOptions, {
    onDelete: 'CASCADE', // Ensures deletion of answer options when the parent question is deleted
  })
  question: Question;

  @OneToMany(
    () => ChoiceResponse,
    (choiceResponse) => choiceResponse.answerOption,
  )
  choiceResponses: ChoiceResponse[];
}
