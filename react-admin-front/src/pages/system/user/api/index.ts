import { get, post } from '@/http';
import type { UserEntity } from '../index.type';
const prefix = '/user';

export function findAllUsers() {
  return get<UserEntity[]>(`${prefix}/findAllUsers`, {});
}

export function addUser(params: UserEntity) {
  return post<UserEntity>(`${prefix}/addUser`, params);
}
