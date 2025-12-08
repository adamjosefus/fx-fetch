import { Brand } from 'effect';

/**
 * A type representing uppercase strings.
 *
 * @category Brands
 * @since 0.1.0
 */
export type Uppercase = string & Brand.Brand<'Uppercase'>;
export const Uppercase = Brand.refined<Uppercase>(
  (s) => s === s.toUpperCase(),
  (s) => Brand.error(`Expected "${s}" to be uppercase`)
);
