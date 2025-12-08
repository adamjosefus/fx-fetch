import { Brand } from 'effect';

/**
 * A type representing a positive number.
 *
 * @category Brands
 * @since 0.1.0
 */
export type Positive = number & Brand.Brand<'Positive'>;
export const Positive = Brand.refined<Positive>(
  (n) => n > 0,
  (n) => Brand.error(`Expected ${n} to be positive`)
);
