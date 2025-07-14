import { UserService } from '@/user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  // 登陆接口
  async signin(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new ForbiddenException('用户不存在，请注册');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或密码错误');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // 注册接口
  async signup(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user) {
      throw new ForbiddenException('用户名已存在，请更换用户名');
    }

    password = await argon2.hash(password);

    return await this.userService.addUser({
      username,
      password,
    });
  }
}
