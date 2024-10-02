import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.squema';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
