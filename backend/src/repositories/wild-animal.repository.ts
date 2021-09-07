import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDatasourceDataSource} from '../datasources';
import {WildAnimal, WildAnimalRelations} from '../models';

export class WildAnimalRepository extends DefaultCrudRepository<
  WildAnimal,
  typeof WildAnimal.prototype.id,
  WildAnimalRelations
> {
  constructor(
    @inject('datasources.postgresqlDatasource') dataSource: PostgresqlDatasourceDataSource,
  ) {
    super(WildAnimal, dataSource);
  }
}
