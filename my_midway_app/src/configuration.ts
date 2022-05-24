import { Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import * as faas from '@midwayjs/faas';
import * as defaultConfig from './config/config.default';
import * as orm from '@midwayjs/orm';
import * as validate from '@midwayjs/validate';
import * as koa from '@midwayjs/koa';

@Configuration({
  imports: [faas, orm, validate, koa],
  importConfigs: [
    {
      default: defaultConfig,
    },
  ],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  async onReady() {}
}
