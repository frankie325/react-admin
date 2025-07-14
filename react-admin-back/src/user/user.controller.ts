import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 查询所有用户
  @UseGuards(JwtAuthGuard)
  @Get('/findAllUsers')
  findAll() {
    // throw new HttpException('自定义错误信息', 400);
    // throw new BadRequestException('This method is not implemented yet.');
    return this.userService.findAll();
  }

  // 根据分页过滤等条件查询用户
  @Post('/findUsers')
  findUsers(@Body() getUserDto: GetUserDto) {
    return this.userService.findUsers(getUserDto);
  }

  // 根据用户名查询用户
  @Get('/findUser/:username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  // 新增用户
  @Post('/addUser')
  addUser(@Body() createUserDto: CreateUserDto) {
    console.log('---------', createUserDto);
    return this.userService.addUser(createUserDto);
  }

  // 更新用户
  @Patch('/updateUser/:id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(id, updateUserDto);
  }

  // 删除用户
  @Delete('/deleteUser/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
