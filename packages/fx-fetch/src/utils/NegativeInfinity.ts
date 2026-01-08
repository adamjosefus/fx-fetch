import { type Brand, error, refined } from 'effect/Brand';

/**
 * A type representing a negative infinity value.
 *
 * @category Brands
 * @since 0.1.0
 */
export type NegativeInfinity = number & Brand<'NegativeInfinity'>;
export const NegativeInfinity = refined<NegativeInfinity>(
  (n) => n === Number.NEGATIVE_INFINITY,
  (n) => error(`Expected ${n} to be a negative infinity`)
);
