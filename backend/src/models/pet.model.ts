import {model, belongsTo} from '@loopback/repository';
import {Animal} from '.';
import {Owner} from './owner.model';

@model()
export class Pet extends Animal {
  @belongsTo(() => Owner)
  ownerId: number;

  constructor(data?: Partial<Pet>) {
    super(data);
  }
}

export interface PetRelations {
  // describe navigational properties here
}
