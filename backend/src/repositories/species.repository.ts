import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDatasourceDataSource} from '../datasources';
import {Species, SpeciesRelations} from '../models';

export class SpeciesRepository extends DefaultCrudRepository<
  Species,
  typeof Species.prototype.id,
  SpeciesRelations
> {
  constructor(
    @inject('datasources.postgresqlDatasource') dataSource: PostgresqlDatasourceDataSource,
  ) {
    super(Species, dataSource);
  }
}
