import { type Brand, error, refined } from 'effect/Brand';

/**
 * A type representing a positive infinity value.
 *
 * @category Brands
 * @since 0.1.0
 */
export type PositiveInfinity = number & Brand<'PositiveInfinity'>;
export const PositiveInfinity = refined<PositiveInfinity>(
  (n) => n === Number.POSITIVE_INFINITY,
  (n) => error(`Expected ${n} to be a positive infinity`)
);
