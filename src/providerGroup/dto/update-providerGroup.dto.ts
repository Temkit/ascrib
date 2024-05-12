// src/providerGroup/dto/update-provider-group.dto.ts

import { IsOptional, Length } from 'class-validator';

export class UpdateProviderGroupDto {
  @IsOptional()
  @Length(1, 50)
  code?: string;

  @IsOptional()
  @Length(1, 150)
  nom?: string;
}
