import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { Provider } from './provider.entity';
import { Country } from '../country/country.entity';
import { Team } from '../team/team.entity';
import { ProjectObjective } from '../projectObjective/project-objective.entity';
import { ProviderGroup } from '../providerGroup/provider-group.entity';
import { Company } from '../company/company.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Provider,
      Country,
      Team,
      ProjectObjective,
      ProviderGroup,
      Company,
      User,
    ]),
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
  exports: [ProviderService], // Export the service if it needs to be used elsewhere in the application
})
export class ProviderModule {}
