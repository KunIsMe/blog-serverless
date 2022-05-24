import {
  Provide,
  Inject,
  Controller,
  Get,
  Post,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { SchemaService } from '../service/schema';
import { SchemaSaveDTO } from '../dto/schema';
import { Validate } from '@midwayjs/validate';
import { getStandardResponse } from '../util/common';
import { ErrortMiddleware } from '../middleware/error.middleware';

@Provide()
@Controller('/api/schema', { middleware: [ErrortMiddleware] })
export class SchemaController {
  @Inject()
  ctx: Context;

  @Inject()
  schemaService: SchemaService;

  @Get('/getLastestOne')
  async getLastestOne() {
    const result = await this.schemaService.getLastestOne();
    return getStandardResponse(true, result);
  }

  @Post('/save')
  @Validate()
  async save(@Body(ALL) bodyObj: SchemaSaveDTO) {
    const result = await this.schemaService.save(bodyObj.schema);
    return getStandardResponse(true, result);
  }
}
