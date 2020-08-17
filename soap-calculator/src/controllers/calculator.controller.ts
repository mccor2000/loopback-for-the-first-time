import {inject} from '@loopback/core';
import {get, param, HttpErrors} from '@loopback/rest';

import {
  Calculator,
  CalculatorParameters,
  AddResponse,
  SubtractResponse,
  MultiplyResponse,
  DivideResponse,
} from '../services/calculator.service';

export class CalculatorController {
  constructor(
    @inject('services.Calculator')
    protected service: Calculator,
  ) {}

  @get('/add/{intA}/{intB}')
  async add(
    @param.path.integer('intA') intA: number,
    @param.path.integer('intB') intB: number,
  ): Promise<AddResponse> {
    return this.service.add(<CalculatorParameters>{
      intA,
      intB,
    });
  }

  @get('/subtract/{intA}/{intB}')
  async subtract(
    @param.path.integer('intA') intA: number,
    @param.path.integer('intB') intB: number,
  ): Promise<SubtractResponse> {
    return this.service.subtract(<CalculatorParameters>{
      intA,
      intB,
    });
  }

  @get('/multiply/{intA}/{intB}')
  async multiply(
    @param.path.integer('intA') intA: number,
    @param.path.integer('intB') intB: number,
  ): Promise<MultiplyResponse> {
    return this.service.multiply(<CalculatorParameters>{
      intA,
      intB,
    });
  }

  @get('/divide/{intA}/{intB}')
  async divide(
    @param.path.integer('intA') intA: number,
    @param.path.integer('intB') intB: number,
  ): Promise<DivideResponse> {
    if (intB === 0) {
      throw new HttpErrors.PreconditionFailed('Cannot divide by zero');
    }

    return this.service.divide(<CalculatorParameters>{
      intA,
      intB,
    });
  }
}
