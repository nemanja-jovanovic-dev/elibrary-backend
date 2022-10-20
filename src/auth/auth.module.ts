import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { SECRET_KEY } from '../utils/constants';

@Module({
  imports: [UserModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: SECRET_KEY,
      signOptions: {expiresIn: '3600000000'}
    })
  })],
  // imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
