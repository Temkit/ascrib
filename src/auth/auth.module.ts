import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseAdminModule } from './firebase-admin.module'; // Assuming it's in the same source folder

@Module({
  imports: [FirebaseAdminModule], // Import FirebaseAdminModule to use Firebase admin throughout the AuthModule
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService if you want it to be available in other parts of your application
})
export class AuthModule {}
