import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'calculator',
  connector: 'soap',
  url: 'https://calculator-webservice.mybluemix.net/calculator',
  wsdl: 'https://calculator-webservice.mybluemix.net/calculator?wsdl',
  remotingEnabled: true,
  operations: {
    multiply: {
      service: 'CalculatorService',
      port: 'CalculatorPort',
      operation: 'Multiply',
    },
    add: {
      service: 'CalculatorService',
      port: 'CalculatorPort',
      operation: 'Add',
    },
    subtract: {
      service: 'CalculatorService',
      port: 'CalculatorPort',
      operation: 'Subtract',
    },
    divide: {
      service: 'CalculatorService',
      port: 'CalculatorPort',
      operation: 'Divide',
    },
  },
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CalculatorDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'calculator';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.calculator', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
