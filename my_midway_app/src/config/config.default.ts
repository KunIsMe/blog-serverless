import { MidwayConfig } from '@midwayjs/core';

export default {
  // if use http/API Gateway, please set keys here.
  keys: '1653117453805_3704',
  orm: {
    /**
     * 单数据库实例
     */
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123000qaz',
    database: 'blog',
    synchronize: true,
    logging: false,
  },
} as MidwayConfig;
