import { Body, Controller, Post } from '@nestjs/common';
import { IUser } from '../user/interface/user.interface';
import { AuthService } from './auth.service';
import { IAuthController } from './interface';
import {
  IAuthParamsForgotPassword,
  IAuthParamsLogin,
  IAuthParamsRegister,
} from './interface/auth.interface';

@Controller('api/auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: IAuthParamsLogin): Promise<IUser> {
    return this.authService.login(body);
  }

  @Post('register')
  async register(
    @Body()
    body: IAuthParamsRegister,
  ): Promise<IUser> {
    return this.authService.register(body);
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
  async forgotPassword(@Body() body: IAuthParamsForgotPassword) {
    return this.authService.forgotPassword(body);
  }
}
