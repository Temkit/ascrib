import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Provider } from '../provider/provider.entity';

@Entity()
export class ProjectObjective {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  // Establish a one-to-many relationship with Provider
  @OneToMany(() => Provider, (provider) => provider.objectif_projet)
  providers: Provider[];
}
