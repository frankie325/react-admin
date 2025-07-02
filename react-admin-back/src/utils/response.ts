import { PaginationDto } from '@/common/dto/pagination.dto';

// 统一响应返回格式
export class ResponseResult<T = any> {
  code: number;
  status: number;
  message: string;
  data: T;

  constructor(code: number, status: number, message: string, data: T) {
    this.code = code;
    this.status = status;
    this.message = message;
    this.data = data;
  }

  //   请求成功，拦截器中设置
  static success<T = any>(
    data: T,
    code: number,
    status: number,
    message: string,
  ): ResponseResult<T> {
    return new ResponseResult<T>(code, status, message, data);
  }

  //   请求失败，过滤器中设置
  static error<T = any>(
    data: T,
    code: number,
    status: number,
    message: string,
  ) {
    return new ResponseResult<T>(code, status, message, data);
  }
}

// 分页数据格式
export class PageData<T extends PaginationDto> {
  list: any[];
  total: number;
  pageNum: number;
  pageSize: number;

  constructor(list: any[], total: number, dto: T) {
    this.list = list;
    this.total = total;
    this.pageNum = dto.pageNum;
    this.pageSize = dto.pageSize;
  }

  static get<T extends PaginationDto>(list: any[], total: number, dto: T) {
    return new PageData<T>(list, total, dto);
  }
}
