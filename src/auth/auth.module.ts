import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: configuration().jwt.global,
        secret: configuration().jwt.secret,
        signOptions: configuration().jwt.signOptions,
      }),
    }),
  ],
})
export class AuthModule {}
