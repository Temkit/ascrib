import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateIf,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  code_externe?: string;

  @IsOptional()
  @IsString()
  token_publique?: string;

  @IsBoolean()
  ignore: boolean;

  @IsOptional()
  @IsDateString()
  date_fin?: string;

  @IsString()
  offre: string;

  @IsBoolean()
  is_prospect_reserved: boolean;

  @IsBoolean()
  connexion_interne_seulement: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  ip_authorized: string[];

  @IsOptional()
  @ValidateIf((o) => o.companyId !== undefined)
  @IsString()
  companyId?: string;

  @IsOptional()
  @ValidateIf((o) => o.providerId !== undefined)
  @IsString()
  providerId?: string;
}
