import { all, type Brand } from 'effect/Brand';
import { Int } from './Int';
import { Positive } from './Positive';

/**
 * A type representing a positive integer.
 *
 * @category Brands
 * @since 0.1.0
 */
export const PositiveInt = all(Int, Positive);
export type PositiveInt = Brand.FromConstructor<typeof PositiveInt>;
