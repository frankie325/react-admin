import { Role } from '@/role/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn, AfterRemove } from 'typeorm';
import { MenuType } from '../menu.enum';
@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  path: string;

  @Column()
  icon: string;

  @Column()
  component: string;

  @Column({
    unique: true,
  })
  permission: string;

  @Column({
    type: 'enum',
    enum: MenuType,
    default: MenuType.menu,
  })
  type: MenuType;

  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
