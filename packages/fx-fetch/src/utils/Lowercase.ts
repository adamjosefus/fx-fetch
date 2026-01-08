import { type Brand, error, refined } from 'effect/Brand';

/**
 * A type representing lowercase strings.
 *
 * @category Brands
 * @since 0.1.0
 */
export type Lowercase = string & Brand<'Lowercase'>;
export const Lowercase = refined<Lowercase>(
  (s) => s === s.toLowerCase(),
  (s) => error(`Expected "${s}" to be lowercase`)
);
