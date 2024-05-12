import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import {
  IsOptional,
  IsEmail,
  IsString,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { Country } from './../country/country.entity';
import { Team } from './../team/team.entity';
import { ProjectObjective } from './../projectObjective/project-objective.entity';
import { ProviderGroup } from './../providerGroup/provider-group.entity';
import { Company } from './../company/company.entity';
import { User } from './../user/user.entity';

export enum GeneralType {
  Aucun = 0,
  Courtier = 1,
  Mandataire = 2,
  Salarie = 3,
  Autre = 4,
  Agent = 5,
}

export enum Type {
  Vendeur = 1,
  Responsable = 2,
  Inspecteur = 4,
  Gestionnaire = 8,
  Grossiste = 16,
  Cabinet = 32,
  Compagnie = 64,
  Autre = 128,
  Agence = 256,
  Siège = 512,
  ConseillerEnAssurance = 1024,
  AssureurConseil = 2048,
  Assureur = 4096,
  Courtier = 8192,
  Salarié = 16384,
  Mandataire = 32768,
  ConseillèreEnAssurance = 65536,
}

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsString()
  code: string;

  @Column({ length: 100, nullable: true })
  @IsOptional()
  @IsString()
  code_externe?: string;

  @Column({ length: 100, nullable: true })
  @IsOptional()
  @IsString()
  groupe_num?: string;

  @Column({ length: 100 })
  @IsString()
  nom: string;

  @Column({ length: 100 })
  @IsString()
  prenom: string;

  @Column({ length: 8 })
  @IsString()
  orias: string;

  @Column({ default: false })
  @IsBoolean()
  orias_valide: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsDateString()
  date_debut_orias?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsDateString()
  date_fin_orias?: string;

  @Column({ length: 20 })
  @IsString()
  telephone: string;

  @Column({ length: 100 })
  @IsEmail()
  mail: string;

  @Column({ length: 100, nullable: true })
  @IsOptional()
  @IsEmail()
  mail_signatures?: string;

  @Column({ length: 100, nullable: true })
  @IsOptional()
  @IsString()
  adresse?: string;

  @Column({ length: 100, nullable: true })
  @IsOptional()
  @IsString()
  complement?: string;

  @Column({ length: 20, nullable: true })
  @IsOptional()
  @IsString()
  code_postal?: string;

  @Column({ length: 100, nullable: true })
  @IsOptional()
  @IsString()
  ville?: string;

  @ManyToOne(() => Country, (country) => country.providers, { nullable: true })
  pays: Country;

  @Column({ length: 34, nullable: true })
  @IsOptional()
  @IsString()
  iban?: string;

  @Column({ length: 11, nullable: true })
  @IsOptional()
  @IsString()
  bic?: string;

  @ManyToOne(() => Team, (team) => team.providers, { nullable: true })
  equipe: Team;

  @ManyToOne(
    () => ProjectObjective,
    (projectObjective) => projectObjective.providers,
    { nullable: true },
  )
  objectif_projet: ProjectObjective;

  @Column({
    type: 'enum',
    enum: GeneralType,
    nullable: true,
  })
  type_general: GeneralType;

  @Column({
    type: 'enum',
    enum: Type,
    nullable: true,
  })
  type: Type;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsString()
  observation?: string;

  @Column({ default: false })
  @IsBoolean()
  bordereaux_bloques: boolean;

  @Column({ default: false })
  @IsBoolean()
  reglements_bloques: boolean;

  @ManyToMany(() => ProviderGroup, (groupe) => groupe.providers)
  groupes: ProviderGroup[];

  @ManyToOne(() => Company, (company) => company.providers)
  company: Company;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsString()
  code_commission_1?: string;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsString()
  code_commission_2?: string;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsString()
  code_commission_3?: string;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsString()
  code_commission_4?: string;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsString()
  code_commission_5?: string;

  @OneToMany(() => User, (user) => user.provider, { nullable: true })
  users: User[];
}
