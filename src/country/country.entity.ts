import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { Provider } from '../provider/provider.entity';

/**
 * The Country entity represents countries in the database,
 * with each country possibly linked to multiple providers.
 */
@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsString()
  @Length(1, 100)
  name: string; // Name of the country

  @Column({ length: 3 })
  @IsString()
  @Length(3, 3)
  iso_code: string; // ISO code of the country, expected to be 3 characters long

  // Relation to Provider entities: one country can be associated with multiple providers
  @OneToMany(() => Provider, (provider) => provider.pays)
  providers: Provider[];
}
