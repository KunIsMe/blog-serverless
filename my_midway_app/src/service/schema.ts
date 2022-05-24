import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Schema } from '../entity/schema';

@Provide()
export class SchemaService {
  @InjectEntityModel(Schema)
  schemaModel: Repository<Schema>;

  async getLastestOne() {
    const schema = await this.schemaModel.findOne({
      where: {},
      select: ['schema'],
      order: { id: 'DESC' },
    });
    return schema;
  }

  async save(schemaStr: string) {
    const schema = new Schema();
    schema.schema = schemaStr;
    const result = await this.schemaModel.save(schema);
    return result;
  }
}
