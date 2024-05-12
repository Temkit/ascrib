import { IsString, Length } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @Length(1, 100)
  name: string; // Name of the country must be between 1 and 100 characters

  @IsString()
  @Length(3, 3)
  iso_code: string; // ISO code must be exactly 3 characters long
}
