import { Brand } from 'effect';

/**
 * A type representing a negative infinity value.
 *
 * @category Brands
 * @since 0.1.0
 */
export type NegativeInfinity = number & Brand.Brand<'NegativeInfinity'>;
export const NegativeInfinity = Brand.refined<NegativeInfinity>(
  (n) => n === Number.NEGATIVE_INFINITY,
  (n) => Brand.error(`Expected ${n} to be a negative infinity`)
);
