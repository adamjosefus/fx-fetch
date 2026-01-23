import { liftThrowable } from 'effect/Option';
import { unsafeMake } from './unsafeMake';

/**
 * Creates a immutable Request object.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * //       ┌─── Option.Option<Request.Request>
 * //       ▼
 * const request = Request.make({
 *   url: 'https://example.com',
 *   method: 'POST'
 * });
 * ```
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * //       ┌─── Option.Option<Request.Request>
 * //       ▼
 * const request = Request.make('https://example.com');
 * ```
 *
 * @category Constructors
 * @since 0.1.0
 */
export const make = liftThrowable(unsafeMake);
