import { Uppercase } from './Uppercase';

/**
 * Converts a string to a `Uppercase` branded type.
 */
export function toUppercase(s: string): Uppercase {
  return Uppercase(s.toUpperCase());
}
