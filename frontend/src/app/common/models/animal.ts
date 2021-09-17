import { Owner } from "./owner";
import { Species } from "./species";

export interface Animal {
  id?: number;
  title?: string;
  vaccinated?: boolean;
  birthday?: Date;
  speciesId?: number;
  species?: Species;
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
