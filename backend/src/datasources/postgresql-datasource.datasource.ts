import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// TODO fix datasource here
const config = {
  name: 'postgresqlDatasource',
  connector: 'postgresql',
  url: ' postgres://username:password@localhost/database',
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mdnd'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgresqlDatasourceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postgresqlDatasource';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postgresqlDatasource', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
