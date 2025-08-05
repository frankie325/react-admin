import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { PageData } from '@/utils/response';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: ['roles'], // 关联查询角色
    });
  }

  async findUsers(getUserDto: GetUserDto) {
    const [list, total] = await this.userRepository.findAndCount({
      relations: ['roles'], // 关联查询角色
      where: {
        username: getUserDto.username,
      },
      skip: (getUserDto.pageNum - 1) * getUserDto.pageSize,
      take: getUserDto.pageSize,
    });

    return PageData.get<GetUserDto>(list, total, getUserDto);
  }

  findOne(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async addUser(createUserDto: CreateUserDto) {
    createUserDto.password = await argon2.hash(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('该用户不存在，请重新输入');
    }
    const tempUser = this.userRepository.merge(user, updateUserDto);
    return this.userRepository.update(id, tempUser);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return null;
    }
    return this.userRepository.remove(user);
  }
}
