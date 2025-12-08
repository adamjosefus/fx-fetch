import { Brand } from 'effect';

/**
 * A type representing lowercase strings.
 *
 * @category Brands
 * @since 0.1.0
 */
export type Lowercase = string & Brand.Brand<'Lowercase'>;
export const Lowercase = Brand.refined<Lowercase>(
  (s) => s === s.toLowerCase(),
  (s) => Brand.error(`Expected "${s}" to be lowercase`)
);
