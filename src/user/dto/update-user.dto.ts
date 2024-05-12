import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateIf,
  IsArray,
  ArrayUnique,
  ArrayNotEmpty,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  code_externe?: string;

  @IsOptional()
  @IsString()
  token_publique?: string;

  @IsOptional()
  @IsBoolean()
  ignore?: boolean;

  @IsOptional()
  @IsDateString()
  date_fin?: string;

  @IsOptional()
  @IsString()
  offre?: string;

  @IsOptional()
  @IsBoolean()
  is_prospect_reserved?: boolean;

  @IsOptional()
  @IsBoolean()
  connexion_interne_seulement?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  ip_authorized?: string[];

  @IsOptional()
  @ValidateIf((o) => o.companyId !== undefined)
  @IsString()
  companyId?: string;

  @IsOptional()
  @ValidateIf((o) => o.providerId !== undefined)
  @IsString()
  providerId?: string;
}
