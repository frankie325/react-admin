import * as dotenv from 'dotenv';
import * as fs from 'fs';

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

// 获取环境变量配置
export function getEnvConfig(key: string) {
  const defaultPath = '.env';
  const exist = fs.existsSync(defaultPath);
  const defaultConfig = exist ? dotenv.parse(fs.readFileSync(defaultPath)) : {};
  const evnPath = `.env.${process.env.NODE_ENV}`;

  const config = {
    ...defaultConfig,
    ...dotenv.parse(fs.readFileSync(evnPath)),
  };

  return config[key] || '';
}
