import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getEnvConfig } from '@/utils/env';
import { ConfigEnum } from './common/enums/config.enum';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 开启后，会自动将请求体中的数据转换为 DTO 中定义的类型,
      whitelist: true, // 开启后，会自动过滤掉 DTO 中未加入验证的属性
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(getEnvConfig(ConfigEnum.PORT) || 3000);
}
bootstrap();
