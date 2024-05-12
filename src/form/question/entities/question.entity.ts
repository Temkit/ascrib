// src/question/entities/question.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AnswerOption } from './answer-option.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @OneToMany(() => AnswerOption, (answerOption) => answerOption.question, {
    cascade: true, // Automatically handle updates and deletes
    eager: true, // Automatically load answer options with the question
  })
  answerOptions: AnswerOption[];
}
