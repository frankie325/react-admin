import { SexEnum } from '@/common/enums';
import { Role } from '@/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) //该字段保持唯一
  username: string;

  // @Column({ select: false }) //该字段不被查询
  @Column() //该字段不被查询
  password: string;

  @Column({
    default: '',
  })
  email: string;

  @Column({
    type: 'enum',
    enum: SexEnum,
    default: SexEnum.male,
  })
  sex: SexEnum;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles', // 中间表名称
  })
  roles: Role[];
}
