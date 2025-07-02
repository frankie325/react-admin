import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // 登陆接口
  async signin(username: string, password: string) {}

  // 注册接口
  async signup(username: string, password: string) {}
}
