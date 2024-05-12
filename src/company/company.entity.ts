// src/company/company.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {
  IsDate,
  IsNotEmpty,
  Length,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { User } from '../user/user.entity';
import { Provider } from '../provider/provider.entity';

export enum CompanyType {
  Agent = 5,
  Aucun = 0,
  Autre = 4,
  Courtier = 1,
  Mandataire = 2,
  Salarié = 3,
}

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @Length(1, 50)
  code: string;

  @Column({ nullable: true })
  @IsOptional()
  logo: string;

  @Column({ length: 150 })
  @Length(1, 150)
  @IsNotEmpty()
  raisonSociale: string;

  @Column({ length: 30 })
  @Length(1, 30)
  siret: string;

  @Column({ length: 30, nullable: true })
  @IsOptional()
  rcs: string;

  @Column({ type: 'enum', enum: CompanyType })
  typeGeneral: CompanyType;

  @Column({ length: 30 })
  @Length(1, 30)
  orias: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  oriasVerifie: boolean;

  @Column({ type: 'date' })
  @IsDate()
  dateDebutOrias: Date;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  dateFinOrias: Date;

  @Column({ length: 100, nullable: true })
  @IsOptional()
  informationContact: string;

  @Column({ length: 20, nullable: true })
  @IsOptional()
  telephone: string;

  @Column({ length: 100, nullable: true })
  @IsOptional()
  mail: string;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  adresse: string;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  complement: string;

  @Column({ length: 5, nullable: true })
  @IsOptional()
  codePostal: string;

  @Column({ length: 50, nullable: true })
  @IsOptional()
  ville: string;

  @Column({ length: 50, nullable: true })
  @IsOptional()
  pays: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Provider, (provider) => provider.company)
  providers: Provider[];

  @Column({ type: 'text', nullable: true })
  divers1: string;

  @Column({ type: 'text', nullable: true })
  divers2: string;

  @Column({ type: 'text', nullable: true })
  divers3: string;

  @Column({ type: 'text', nullable: true })
  divers4: string;

  @Column({ type: 'text', nullable: true })
  divers5: string;

  @Column({ type: 'text', nullable: true })
  divers6: string;

  @Column({ type: 'text', nullable: true })
  divers7: string;

  @Column({ type: 'text', nullable: true })
  divers8: string;

  @Column({ type: 'text', nullable: true })
  divers9: string;

  @Column({ type: 'text', nullable: true })
  divers10: string;

  @Column({ type: 'text', nullable: true })
  divers11: string;

  @Column({ type: 'text', nullable: true })
  divers12: string;

  @Column({ type: 'text', nullable: true })
  divers13: string;

  @Column({ type: 'text', nullable: true })
  divers14: string;

  @Column({ type: 'text', nullable: true })
  divers15: string;

  @Column({ type: 'text', nullable: true })
  divers16: string;

  @Column({ type: 'text', nullable: true })
  divers17: string;

  @Column({ type: 'text', nullable: true })
  divers18: string;

  @Column({ type: 'text', nullable: true })
  divers19: string;

  @Column({ type: 'text', nullable: true })
  divers20: string;
}
