import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { GeneralType, Type as ProviderType } from './../provider.entity';
import { Country } from './../../country/country.entity';
import { Team } from './../../team/team.entity';
import { ProjectObjective } from './../../projectObjective/project-objective.entity';
import { Company } from './../../company/company.entity';

export class UpdateProviderDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  code_externe?: string;

  @IsString()
  @IsOptional()
  groupe_num?: string;

  @IsString()
  @IsOptional()
  nom?: string;

  @IsString()
  @IsOptional()
  prenom?: string;

  @IsString()
  @IsOptional()
  orias?: string;

  @IsBoolean()
  @IsOptional()
  orias_valide?: boolean;

  @IsDateString()
  @IsOptional()
  date_debut_orias?: string;

  @IsDateString()
  @IsOptional()
  date_fin_orias?: string;

  @IsString()
  @IsOptional()
  telephone?: string;

  @IsEmail()
  @IsOptional()
  mail?: string;

  @IsEmail()
  @IsOptional()
  mail_signatures?: string;

  @IsString()
  @IsOptional()
  adresse?: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsOptional()
  code_postal?: string;

  @IsString()
  @IsOptional()
  ville?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Country)
  pays?: Country;

  @IsString()
  @IsOptional()
  iban?: string;

  @IsString()
  @IsOptional()
  bic?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Team)
  equipe?: Team;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectObjective)
  objectif_projet?: ProjectObjective;

  @IsOptional()
  type_general?: GeneralType;

  @IsOptional()
  type?: ProviderType;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsBoolean()
  @IsOptional()
  bordereaux_bloques?: boolean;

  @IsBoolean()
  @IsOptional()
  reglements_bloques?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => Company)
  company?: Company;

  @IsString()
  @IsOptional()
  code_commission_1?: string;

  @IsString()
  @IsOptional()
  code_commission_2?: string;

  @IsString()
  @IsOptional()
  code_commission_3?: string;

  @IsString()
  @IsOptional()
  code_commission_4?: string;

  @IsString()
  @IsOptional()
  code_commission_5?: string;
}
