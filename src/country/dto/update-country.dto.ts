import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  @Length(1, 100)
  @IsOptional()
  name?: string; // Optional: update the name if provided

  @IsString()
  @Length(3, 3)
  @IsOptional()
  iso_code?: string; // Optional: update the ISO code if provided
}
