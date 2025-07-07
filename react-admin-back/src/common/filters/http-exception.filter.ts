import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseResult } from '@/utils/response';
// 捕获HTTP异常的过滤器
// 该过滤器会在发生HTTP异常时被调用，并返回统一的错误响应
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    // console.log('----response-----', response);
    // console.log('----exception----', exception);
    // console.log('---------', exception.getResponse());
    const res = exception.getResponse();

    let message: string = '';
    if (typeof res === 'string') {
      message = res;
    } else if ('message' in res) {
      message = Array.isArray(res.message)
        ? res.message.join('; ')
        : (res.message as string);
    } else {
      message = '';
    }

    response
      .status(status)
      .json(ResponseResult.error(null, -1, status, message));
  }
}
