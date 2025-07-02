import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { ResponseResult } from '@/utils/response';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseResult<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseResult<T>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: T) => {
        // 统一请求成功响应格式
        return ResponseResult.success(data, 0, response.statusCode, '请求成功');
      }),
    );
  }
}
