import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProjectObjectiveDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
