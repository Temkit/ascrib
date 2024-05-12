// src/company/company.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]), // Registers the Company entity with TypeOrm
  ],
  providers: [CompanyService], // Registers the CompanyService as a provider
  controllers: [CompanyController], // Registers the CompanyController
  exports: [CompanyService], // Exports the CompanyService for use in other modules
})
export class CompanyModule {}
