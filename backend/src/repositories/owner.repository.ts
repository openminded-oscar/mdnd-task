import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDatasourceDataSource} from '../datasources';
import {Owner, OwnerRelations} from '../models';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype.id,
  OwnerRelations
> {
  constructor(
    @inject('datasources.postgresqlDatasource') dataSource: PostgresqlDatasourceDataSource,
  ) {
    super(Owner, dataSource);
  }
}
