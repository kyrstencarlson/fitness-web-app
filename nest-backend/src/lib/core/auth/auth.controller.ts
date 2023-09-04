import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IUser } from '../user/interface/user.interface';
import { AuthService } from './auth.service';
import { IAuthController } from './interface';
import {
  IAuthParamsForgotPassword,
  IAuthParamsLogin,
  IAuthParamsRegister,
  IAuthParamsResetPassword,
} from './interface/auth.interface';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: IAuthParamsLogin) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(
    @Body()
    body: IAuthParamsRegister,
  ) {
    return this.authService.register(body);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  @Post('refresh-token')
  async refreshToken() {
    return this.authService.refreshToken();
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: IAuthParamsForgotPassword) {
    return this.authService.forgotPassword(body);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: IAuthParamsResetPassword) {
    return this.authService.resetPassword(body);
  }

  @Get(':user_id')
  @UseGuards(AuthGuard)
  async getUser(@Param('user_id') userId: string) {
    return this.authService.getUser(userId);
  }
}
