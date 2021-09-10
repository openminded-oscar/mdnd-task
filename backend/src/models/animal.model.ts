import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Species} from './species.model';
import { BaseEntity } from "./base-entity.model";

@model()
export class Animal extends BaseEntity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'date',
  })
  birthday?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  vaccinated: boolean;

  @belongsTo(() => Species)
  speciesId: number;

  constructor(data?: Partial<Animal>) {
    super(data);
  }
}

export interface AnimalRelations {
  // describe navigational properties here
}

export type AnimalWithRelations = Animal & AnimalRelations;
