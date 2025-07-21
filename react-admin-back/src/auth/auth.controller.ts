import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signin(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.authService.signin(username, password);
  }

  @Post('/signup')
  signup(@Body() dto: SignupUserDto) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }

  @Post('/refresh')
  refreshToken(@Body() dto: { refresh_token: string }) {
    const { refresh_token } = dto;
    return this.authService.refreshToken(refresh_token);
  }
}
