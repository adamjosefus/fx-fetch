import { Option } from 'effect';
import { unsafeMake } from './unsafeMake';

/**
 * Creates a immutable Request object.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * ```
 *
 * @category Constructors
 * @since 0.1.0
 */
export const make = Option.liftThrowable(unsafeMake);
