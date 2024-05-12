import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateResponseDto {
  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @IsOptional()
  @IsBoolean()
  booleanAnswer?: boolean;

  @IsOptional()
  @IsNumber()
  numberAnswer?: number;

  @IsOptional()
  @IsDate()
  dateAnswer?: Date;

  @IsOptional()
  @IsString()
  textAnswer?: string;

  @IsOptional()
  @IsNumber()
  choiceAnswerId?: number; // Assuming choices are identified by ID
}
