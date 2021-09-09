import { Owner } from "./owner";

export interface Animal {
  id?: number;
  title?: string;
  vaccinated?: boolean;
  birthday?: Date;
  created_at?: string;
  updated_at?: string;
}

export interface Pet extends Animal {
  ownerId?: number;
  owner?: Owner;
}

export interface WildAnimal extends Animal {
  trackingId?: number;
}
