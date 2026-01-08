import { type Brand, error, refined } from 'effect/Brand';

/**
 * A type representing uppercase strings.
 *
 * @category Brands
 * @since 0.1.0
 */
export type Uppercase = string & Brand<'Uppercase'>;
export const Uppercase = refined<Uppercase>(
  (s) => s === s.toUpperCase(),
  (s) => error(`Expected "${s}" to be uppercase`)
);
