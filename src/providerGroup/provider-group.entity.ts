// src/providerGroup/provider-group.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import { Provider } from '../provider/provider.entity';

@Entity()
export class ProviderGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @IsNotEmpty() // Ensures the field is not empty
  @Length(1, 50) // Validates that the length of the code is between 1 and 50 characters
  code: string;

  @Column({ length: 150 })
  @IsNotEmpty()
  @Length(1, 150) // Validates that the length of the name is between 1 and 150 characters
  nom: string;

  @ManyToMany(() => Provider, (provider) => provider.groupes)
  providers: Provider[];
}
