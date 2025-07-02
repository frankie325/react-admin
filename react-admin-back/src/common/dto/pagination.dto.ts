import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  pageSize: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  pageNum: number;
}
