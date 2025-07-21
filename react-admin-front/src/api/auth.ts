import { post } from '@/http';

const prefix = '/auth';

export function login(data: Record<string, unknown>) {
  return post(`${prefix}/signin`, data);
}
