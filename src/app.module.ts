import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Import all modules

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ascrib.cdysuii2iwi7.us-east-1.rds.amazonaws.com/',
      port: 5432,
      username: 'ascrib_user_root',
      password: 'ovXg3d5RH5Mfcb6XVU2o',
      database: 'main_software_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // Add all modules here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
