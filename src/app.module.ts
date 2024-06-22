import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'; // Import the AuthModule
import { AuthMiddleware } from './auth/auth.middleware'; // Import the AuthMiddleware

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
    AuthModule, // Add the AuthModule to your imports
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), AuthMiddleware)
      .exclude(
        { path: 'auth/verify-token', method: RequestMethod.POST },
        // Add more paths as needed that you want to exclude from token verification
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Apply this middleware to all routes
  }
}
