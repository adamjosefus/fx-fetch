import { Brand } from 'effect';

/**
 * A type representing a positive infinity value.
 *
 * @category Brands
 * @since 0.1.0
 */
export type PositiveInfinity = number & Brand.Brand<'PositiveInfinity'>;
export const PositiveInfinity = Brand.refined<PositiveInfinity>(
  (n) => n === Number.POSITIVE_INFINITY,
  (n) => Brand.error(`Expected ${n} to be a positive infinity`)
);
