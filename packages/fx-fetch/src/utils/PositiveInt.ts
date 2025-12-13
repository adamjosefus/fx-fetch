import { Brand } from 'effect';
import { Int } from './Int';
import { Positive } from './Positive';

/**
 * A type representing a positive integer.
 *
 * @category Brands
 * @since 0.1.0
 */
export const PositiveInt = Brand.all(Int, Positive);
export type PositiveInt = Brand.Brand.FromConstructor<typeof PositiveInt>;
