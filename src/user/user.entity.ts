import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Company } from '../company/company.entity';
import { Provider } from '../provider/provider.entity';
import { Team } from '../team/team.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  code_externe: string;

  @Column({ unique: true })
  token_publique: string;

  @Column({ default: false })
  @IsBoolean()
  ignore: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsDateString()
  date_fin?: string;

  @Column({ unique: true })
  offre: string;

  @Column({ default: false })
  @IsBoolean()
  is_prospect_reserved: boolean;

  @Column({ default: false })
  @IsBoolean()
  connexion_interne_seulement: boolean;

  @Column('simple-array', { unique: true })
  @IsArray()
  ip_authorized: string[];

  @ManyToOne(() => Company, (company) => company.users, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @ManyToOne(() => Provider, (provider) => provider.users, {
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  @Type(() => Provider)
  provider: Provider;

  @OneToMany(() => Team, (team) => team.teamMembers)
  @ValidateNested({ each: true })
  @Type(() => Team)
  team: Team;
}
