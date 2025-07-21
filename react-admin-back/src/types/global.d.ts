import { User } from '../user/user.entity';

import 'express';

declare module 'express' {
  interface Request {
    user: User; // 在请求对象中添加user属性，用于存储用户信息
  }
}

declare global {
  type JwtPayload = {
    sub: string;
    username: string;
  };
}
