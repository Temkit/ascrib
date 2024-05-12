import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './../user/user.entity';
import { Provider } from './../provider/provider.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 50, // Reduced length for optimization
  })
  code: string;

  @Column({
    length: 100, // Name does not need to be unique unless specified
  })
  name: string;

  @OneToMany(() => Provider, (provider) => provider.equipe, {
    cascade: true, // Allows for easier management of related providers
  })
  providers: Provider[];

  @OneToOne(() => User, {
    cascade: ['insert', 'update'], // Enables cascading operations for the team leader
  })
  @JoinColumn() // Indicates this side as the owning side of the relationship
  teamLeader: User;

  @OneToMany(() => User, (user) => user.team, {
    cascade: true, // Allows for easier management of team members
  })
  teamMembers: User[];

  // Additional fields like teamName can be added here if required
}
