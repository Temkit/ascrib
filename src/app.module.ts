import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CompanyModule } from './company/company.module';
import { CountryModule } from './country/country.module';
import { QuestionModule } from './form/question/question.module';
import { UserResponseModule } from './form/user-response/user-response.module';
import { ProjectObjectiveModule } from './projectObjective/project-objective.module';
import { ProviderModule } from './provider/provider.module';
import { ProviderGroupModule } from './providerGroup/provider-group.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ascrib.cdysuii2iwi7.us-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'ascrib_user_root',
      password: 'ovXg3d5RH5Mfcb6XVU2o',
      database: 'main_software_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // This bypasses the certificate validation
      },
    }),
    CompanyModule,
    CountryModule,
    QuestionModule,
    UserResponseModule,
    ProjectObjectiveModule,
    ProviderModule,
    ProviderGroupModule,
    TeamModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
