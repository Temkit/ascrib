import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderGroupService } from './provider-group.service';
import { ProviderGroupController } from './providerGroup.controller';
import { ProviderGroup } from './provider-group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderGroup]), // Registering the Country entity for dependency injection
  ],
  controllers: [ProviderGroupController], // Registering the CountryController
  providers: [ProviderGroupService], // Registering the CountryService
})
export class ProviderGroupModule {}
