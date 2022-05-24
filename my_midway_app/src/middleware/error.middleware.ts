/* eslint-disable prettier/prettier */
import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { getStandardResponse } from '../util/common';

@Middleware()
export class ErrortMiddleware implements IMiddleware<Context, NextFunction> {

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
          await next();
      } catch (error) {
          ctx.body = getStandardResponse(false, null, error.message);
      }
    };
  }
}
