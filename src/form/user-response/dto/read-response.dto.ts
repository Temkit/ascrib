import { Type } from 'class-transformer';

export class ReadResponseDto {
  id: number;
  questionId: number;

  @Type(() => Date)
  responseDate: Date;

  booleanAnswer?: boolean;
  numberAnswer?: number;
  dateAnswer?: Date;
  textAnswer?: string;
  choiceAnswerId?: number;

  // If needed, add a field to include detailed information about the chosen option
  choiceAnswerDetail?: { id: number; text: string };
}
