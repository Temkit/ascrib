import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectObjectiveService } from './project-objective.service';
import { ProjectObjectiveController } from './project-objective.controller';
import { ProjectObjective } from './project-objective.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectObjective]), // Registering the Country entity for dependency injection
  ],
  controllers: [ProjectObjectiveController], // Registering the CountryController
  providers: [ProjectObjectiveService], // Registering the CountryService
})
export class ProjectObjectiveModule {}
