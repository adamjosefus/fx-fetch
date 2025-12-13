import { Brand } from 'effect';
import { Int } from './Int';
import { Negative } from './Negative';

export const NegativeInt = Brand.all(Int, Negative);
export type NegativeInt = Brand.Brand.FromConstructor<typeof NegativeInt>;
