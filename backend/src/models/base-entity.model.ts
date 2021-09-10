import { Entity, property } from "@loopback/repository";

export abstract class BaseEntity extends Entity {
    @property({
        type: 'date',
        default: () => new Date(),
        postgresql: {
            columnName: 'updated_at',
        },
    })
    updatedAt?: Date;
}
