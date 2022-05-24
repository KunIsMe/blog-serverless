/* eslint-disable prettier/prettier */
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel()
export class Schema {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  schema: string;
}
