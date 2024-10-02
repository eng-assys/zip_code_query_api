import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      try {
        const checkIncomePassword = await this.userService.checkIncomePassword(
          pass,
          user.password,
        );
        if (checkIncomePassword) {
          const payload = { sub: user.id, email: user.email };

          return {
            accessToken: await this.jwtService.signAsync(payload),
          };
        }
      } catch (error) {
        throw new UnauthorizedException(error);
      }
    }

    return null;
  }
}
