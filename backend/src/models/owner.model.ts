import {Entity, model, property} from '@loopback/repository';
import { Address } from "./address.model";

@model()
export class Owner extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  fullName: string;

  @property({
    type: 'object',
    required: true,
  })
  address: Address;

  constructor(data?: Partial<Owner>) {
    super(data);
  }
}

export interface OwnerRelations {
  // describe navigational properties here
}

export type OwnerWithRelations = Owner & OwnerRelations;
