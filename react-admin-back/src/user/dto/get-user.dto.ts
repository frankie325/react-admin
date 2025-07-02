import { PaginationDto } from '@/common/dto/pagination.dto';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class GetUserDto extends PaginationDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
