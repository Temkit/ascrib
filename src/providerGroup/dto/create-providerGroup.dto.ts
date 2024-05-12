// src/providerGroup/dto/create-provider-group.dto.ts

import { IsNotEmpty, Length } from 'class-validator';

export class CreateProviderGroupDto {
  @IsNotEmpty()
  @Length(1, 50)
  code: string;

  @IsNotEmpty()
  @Length(1, 150)
  nom: string;
}
