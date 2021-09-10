import {Model, model, property} from '@loopback/repository';

@model()
export class Address extends Model {
  @property({
    type: 'string',
    required: true,
  })
  street: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'string',
  })
  zipCode?: string;


  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
