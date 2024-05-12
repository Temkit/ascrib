import { Expose, Type } from 'class-transformer';

import { GeneralType, Type as ProviderType } from './../provider.entity';
import { Country } from './../../country/country.entity';
import { Team } from './../../team/team.entity';
import { ProjectObjective } from './../../projectObjective/project-objective.entity';
import { Company } from './../../company/company.entity';

export class ReadProviderDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  code_externe?: string;

  @Expose()
  groupe_num?: string;

  @Expose()
  nom: string;

  @Expose()
  prenom: string;

  @Expose()
  orias: string;

  @Expose()
  orias_valide: boolean;

  @Expose()
  date_debut_orias?: string;

  @Expose()
  date_fin_orias?: string;

  @Expose()
  telephone: string;

  @Expose()
  mail: string;

  @Expose()
  mail_signatures?: string;

  @Expose()
  adresse?: string;

  @Expose()
  complement?: string;

  @Expose()
  code_postal?: string;

  @Expose()
  ville?: string;

  @Expose()
  @Type(() => Country)
  pays: Country;

  @Expose()
  iban?: string;

  @Expose()
  bic?: string;

  @Expose()
  @Type(() => Team)
  equipe: Team;

  @Expose()
  @Type(() => ProjectObjective)
  objectif_projet: ProjectObjective;

  @Expose()
  type_general: GeneralType;

  @Expose()
  type: ProviderType;

  @Expose()
  observation?: string;

  @Expose()
  bordereaux_bloques: boolean;

  @Expose()
  reglements_bloques: boolean;

  @Expose()
  @Type(() => Company)
  company: Company;

  @Expose()
  code_commission_1?: string;

  @Expose()
  code_commission_2?: string;

  @Expose()
  code_commission_3?: string;

  @Expose()
  code_commission_4?: string;

  @Expose()
  code_commission_5?: string;
}
