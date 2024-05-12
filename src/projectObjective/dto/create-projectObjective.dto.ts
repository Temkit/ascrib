import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProjectObjectiveDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
}
