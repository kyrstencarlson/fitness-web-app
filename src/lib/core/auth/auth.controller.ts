import { Body, Controller, Post } from '@nestjs/common';
import { IUser } from '../user/interface/user.interface';
import { AuthService } from './auth.service';
import { IAuthController } from './interface';

@Controller('api/auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() email: string, password: string): Promise<IUser> {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(
    @Body()
    params: {
      email: string;
      password: string;
      confirmPassword: string;
    },
  ): Promise<IUser> {
    return this.authService.register(params);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  // @Post('refresh-token')
  // async refreshToken() {
  //   return this.authService.refreshToken();
  // }

  @Post('forgot-password')
  async forgotPassword(@Body() email: string) {
    return this.authService.forgotPassword(email);
  }
}
