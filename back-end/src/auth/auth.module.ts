import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// SRC
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// SHARED
import { appConstants } from '@shared/constants/app.constant';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: appConstants.jwtSecret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
