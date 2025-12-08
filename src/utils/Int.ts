import { Brand } from 'effect';

/**
 * A type representing an integer.
 *
 * @category Brands
 * @since 0.1.0
 */
export type Int = number & Brand.Brand<'Int'>;
export const Int = Brand.refined<Int>(
  (n) => Number.isInteger(n),
  (n) => Brand.error(`Expected ${n} to be an integer`)
);
