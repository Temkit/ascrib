import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CompanyModule } from '../company/company.module';
import { ProviderModule } from '../provider/provider.module';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register User entity with TypeOrm
    CompanyModule, // Import CompanyModule if User has relations that need to be resolved within the UserService
    ProviderModule, // Import ProviderModule
    TeamModule, // Import TeamModule
  ],
  controllers: [UserController], // Register UserController
  providers: [UserService], // Register UserService
  exports: [UserService], // Export UserService for use in other modules
})
export class UserModule {}
