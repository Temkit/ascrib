import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { Team } from './team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team])], // Importing the Team entity
  controllers: [TeamController], // Registering the TeamController
  providers: [TeamService], // Registering the TeamService
  exports: [TeamService], // Optionally export the service if it will be used elsewhere
})
export class TeamModule {}
