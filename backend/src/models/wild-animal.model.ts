import {model, property} from '@loopback/repository';
import {Animal} from '.';

@model()
export class WildAnimal extends Animal {
  @property({
    type: 'string',
    index: {unique: true}
  })
  trackingId?: string;


  constructor(data?: Partial<WildAnimal>) {
    super(data);
  }
}

export interface WildAnimalRelations {
  // describe navigational properties here
}

export type WildAnimalWithRelations = WildAnimal & WildAnimalRelations;
