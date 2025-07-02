import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum, LogEnum } from './src/common/enums/config.enum';

// typeorm cli无法解析路径别名，使用相对路径
// import { getEnvConfig, isDevelopment, isTest } from '@/utils/env';
import { getEnvConfig, isDevelopment, isTest } from './src/utils/env';
import { DataSource, DataSourceOptions } from 'typeorm';

console.log('----------', isDevelopment());

const entitiesDir = isTest()
  ? [__dirname + '/**/*.entity.ts']
  : [__dirname + '/**/*.entity{.js,.ts}'];

// console.log(__filename);
// console.log(__dirname);
// console.log(entitiesDir);

const connectParams = {
  type: getEnvConfig(ConfigEnum.DATABASE_TYPE),
  host: getEnvConfig(ConfigEnum.DATABASE_HOST),
  port: getEnvConfig(ConfigEnum.DATABASE_PORT),
  username: getEnvConfig(ConfigEnum.DATABASE_USER),
  password: getEnvConfig(ConfigEnum.DATABASE_PASSWORD),
  database: getEnvConfig(ConfigEnum.DATABASE_NAME),
  logging: getEnvConfig(LogEnum.LOG_ON),
  entities: entitiesDir,
  synchronize: isDevelopment(),
  migrations: ['migration/**'], // 迁移文件目录
  autoLoadEntities: true,
} as TypeOrmModuleOptions;

export default connectParams;

export const AppDataSource = new DataSource(connectParams as DataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
/*
synchronize只会同步表，不会同步数据库架构
如果需要同步数据库架构，请使用migration

在package.json中添加以下命令：
"typeorm": "typeorm-ts-node-commonjs", //typeorm cli只认识js文件，需要使用ts-node解析ts文件
"migration:create": "npm run typeorm migration:create ./migrations/migration",
"migration:generate": "npm run typeorm migration:generate ./migrations/migration -- -d ./ormconfig.ts"
"migration:run": "npm run typeorm migration:run -- -d ./ormconfig.ts",
"migration:revert": "npm run typeorm migration:revert -- -d ./ormconfig.ts",
1.创建迁移文件目录
npm run typeorm migration:create ./migrations/migration

2.生成迁移文件（根据dataSource中的数据库架构生成迁移文件）
npm run typeorm migration:generate ./migrations/migration -- -d ./ormconfig.ts

3.运行迁移文件（当获取该仓库时，需要初始化数据库，运行迁移文件创建数据库架构）
npm run typeorm migration:run -- -d ./ormconfig.ts

4.回滚迁移文件（如果需要回滚迁移文件，可以使用以下命令）
npm run typeorm migration:revert -- -d ./ormconfig.ts
*/
