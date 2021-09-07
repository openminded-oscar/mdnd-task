import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresqlDatasourceDataSource} from '../datasources';
import {Owner, OwnerRelations, Address, Pet} from '../models';
import {AddressRepository} from './address.repository';
// import {PetRepository} from './pet.repository';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype.id,
  OwnerRelations
> {

  public readonly address: HasOneRepositoryFactory<Address, typeof Owner.prototype.id>;

  public readonly pets: HasManyRepositoryFactory<Pet, typeof Owner.prototype.id>;

  constructor(
    @inject('datasources.postgresqlDatasource') dataSource: PostgresqlDatasourceDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>,
    // @repository.getter('PetRepository') protected petRepositoryGetter: Getter<PetRepository>,
  ) {
    super(Owner, dataSource);
    // this.pets = this.createHasManyRepositoryFactoryFor('pets', petRepositoryGetter,);
    // this.registerInclusionResolver('pets', this.pets.inclusionResolver);
    this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
  }
}
