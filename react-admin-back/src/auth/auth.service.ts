import { User } from '@/user/entities/user.entity';
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

  /**
   * @description: 登陆接口
   * @param {string} username
   * @param {string} password
   */
  async signin(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new ForbiddenException('用户不存在，请注册');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或密码错误');
    }

    return await this.generateToken(user);
  }

  /**
   * @description: 注册接口
   * @param {string} username
   * @param {string} password
   */
  async signup(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user) {
      throw new ForbiddenException('用户名已存在，请更换用户名');
    }
    return await this.userService.addUser({
      username,
      password,
    });
  }

  /**
   * @description: 生成双token
   * access_token: 用于访问受保护的资源，通常有较短的过期时间（如1小时）
   * refresh_token: 用于获取新的 access_token，通常有较长的过期时间（如7天）
   */
  async generateToken(user: Pick<User, 'id' | 'username'>) {
    const payload: JwtPayload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d', // 设置 access_token 的过期时间为 1 小时
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d', // 设置 refresh_token 的过期时间为 7 天
    });

    return {
      access_token,
      refresh_token,
    };
  }

  /**
   * @description: 刷新令牌
   * @param {string} refresh_token 前端需要传入刷新token
   * @return {*} 返回双token
   */
  async refreshToken(refresh_token: string) {
    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(refresh_token);

      const user = await this.userService.findOne(payload.username);
      if (!user) {
        throw new ForbiddenException('用户不存在，请重新登录');
      }

      return await this.generateToken(user);
    } catch {
      throw new ForbiddenException('刷新令牌失败，请重新登录');
    }
  }
}
