import { all, type Brand } from 'effect/Brand';
import { Int } from './Int';
import { Negative } from './Negative';

export const NegativeInt = all(Int, Negative);
export type NegativeInt = Brand.FromConstructor<typeof NegativeInt>;
