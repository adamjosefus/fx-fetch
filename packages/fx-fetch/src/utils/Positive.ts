import { type Brand, error, refined } from 'effect/Brand';

/**
 * A type representing a positive number.
 *
 * @category Brands
 * @since 0.1.0
 */
export type Positive = number & Brand<'Positive'>;
export const Positive = refined<Positive>(
  (n) => n > 0,
  (n) => error(`Expected ${n} to be positive`)
);
