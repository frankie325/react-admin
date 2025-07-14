import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@/common/enums/config.enum';

type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ConfigEnum.JWT_SECRET) as string,
    });
  }
  // Passport 将基于 validate() 方法的返回值构建一个user 对象，并将其作为属性附加到请求对象上
  validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.username };
  }
}
