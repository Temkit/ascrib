import { IsOptional, IsBoolean, IsDate, Length } from 'class-validator';
import { CompanyType } from './../company.entity';

export class UpdateCompanyDto {
  @IsOptional()
  @Length(1, 50)
  code?: string;

  @IsOptional()
  logo?: string;

  @IsOptional()
  @Length(1, 150)
  raisonSociale?: string;

  @IsOptional()
  @Length(1, 30)
  siret?: string;

  @IsOptional()
  @Length(1, 30)
  rcs?: string;

  @IsOptional()
  typeGeneral?: CompanyType;

  @IsOptional()
  @Length(1, 30)
  orias?: string;

  @IsOptional()
  @IsBoolean()
  oriasVerifie?: boolean;

  @IsOptional()
  @IsDate()
  dateDebutOrias?: Date;

  @IsOptional()
  @IsDate()
  dateFinOrias?: Date;

  @IsOptional()
  informationContact?: string;

  @IsOptional()
  telephone?: string;

  @IsOptional()
  mail?: string;

  @IsOptional()
  adresse?: string;

  @IsOptional()
  complement?: string;

  @IsOptional()
  codePostal?: string;

  @IsOptional()
  ville?: string;

  @IsOptional()
  pays?: string;

  @IsOptional()
  divers1?: string;

  @IsOptional()
  divers2?: string;

  @IsOptional()
  divers3?: string;

  @IsOptional()
  divers4?: string;

  @IsOptional()
  divers5?: string;

  @IsOptional()
  divers6?: string;

  @IsOptional()
  divers7?: string;

  @IsOptional()
  divers8?: string;

  @IsOptional()
  divers9?: string;

  @IsOptional()
  divers10?: string;

  @IsOptional()
  divers11?: string;

  @IsOptional()
  divers12?: string;

  @IsOptional()
  divers13?: string;

  @IsOptional()
  divers14?: string;

  @IsOptional()
  divers15?: string;

  @IsOptional()
  divers16?: string;

  @IsOptional()
  divers17?: string;

  @IsOptional()
  divers18?: string;

  @IsOptional()
  divers19?: string;

  @IsOptional()
  divers20?: string;
}
