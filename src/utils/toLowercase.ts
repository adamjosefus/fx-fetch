import { Lowercase } from './Lowercase';

/**
 * Converts a string to a `Lowercase` branded type.
 */
export function toLowercase(s: string): Lowercase {
  return Lowercase(s.toLowerCase());
}
