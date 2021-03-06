import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresqlDatasourceDataSource} from '../datasources';
import {Pet, PetRelations, Owner} from '../models';
import {OwnerRepository} from './owner.repository';

export class PetRepository extends DefaultCrudRepository<
  Pet,
  typeof Pet.prototype.id,
  PetRelations
> {

  public readonly owner: BelongsToAccessor<Owner, typeof Pet.prototype.id>;

  constructor(
    @inject('datasources.postgresqlDatasource') dataSource: PostgresqlDatasourceDataSource, @repository.getter('OwnerRepository') protected ownerRepositoryGetter: Getter<OwnerRepository>,
  ) {
    super(Pet, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', ownerRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
  }
}
