// src/question/dto/read-question.dto.ts

import { Expose, Type } from 'class-transformer';

class ReadAnswerOptionDto {
  @Expose()
  id: number;

  @Expose()
  text: string;
}

export class ReadQuestionDto {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Expose()
  @Type(() => ReadAnswerOptionDto)
  answerOptions: ReadAnswerOptionDto[];
}
