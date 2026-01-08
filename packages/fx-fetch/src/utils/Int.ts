import { type Brand, error, refined } from 'effect/Brand';

/**
 * A type representing an integer.
 *
 * @category Brands
 * @since 0.1.0
 */
export type Int = number & Brand<'Int'>;
export const Int = refined<Int>(
  (n) => Number.isInteger(n),
  (n) => error(`Expected ${n} to be an integer`)
);
