import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {CalculatorDataSource} from '../datasources';

export interface Calculator {
  add(args: CalculatorParameters): Promise<AddResponse>;
  subtract(args: CalculatorParameters): Promise<SubtractResponse>;
  multiply(args: CalculatorParameters): Promise<MultiplyResponse>;
  divide(args: CalculatorParameters): Promise<DivideResponse>;
}

export class CalculatorProvider implements Provider<Calculator> {
  constructor(
    // calculator must match the name property in the datasource json file
    @inject('datasources.calculator')
    protected dataSource: CalculatorDataSource = new CalculatorDataSource(),
  ) {}

  value(): Promise<Calculator> {
    return getService(this.dataSource);
  }
}

export interface CalculatorParameters {
  intA: number;
  intB: number;
}

export interface AddResponse {
  result: {
    value: number;
  };
}

export interface SubtractResponse {
  result: {
    value: number;
  };
}

export interface MultiplyResponse {
  result: {
    value: number;
  };
}

export interface DivideResponse {
  result: {
    value: number;
  };
}

