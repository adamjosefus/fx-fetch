import { Tag } from 'effect/Context';
import { type Effect } from 'effect/Effect';
import type { Request } from '../Request';
import { NotOkError, type Response } from '../Response';
import { AbortError, FetchError, NotAllowedError } from './errors';

export namespace Fetch {
  /**
   * Type alias for the successful response type of the Fetch service.
   * @since 1.2.0
   * @category Models
   */
  export type SuccessType = Response;

  /**
   * Type alias for the failure response type of the Fetch service.
   * @since 1.2.0
   * @category Models
   */
  export type ErrorType = AbortError | FetchError | NotAllowedError | NotOkError;
}

/**
 * Fetch service for making or mocking HTTP requests.
 *
 * @example
 * ```ts
 * import { Effect } from 'effect';
 * import { Fetch, Request } from 'fx-fetch';
 *
 * Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: 'https://example.com' });
 *
 *   const fetch = yield* Fetch.Fetch; // ◀︎── Get the Fetch service
 *   const response = yield* fetch(request);
 * }).pipe(
 *   Effect.provide(Fetch.layer), // ◀︎── Provide built-in Fetch layer
 *   Effect.runPromise
 * );
 * ```
 *
 * @category Services
 * @since 0.1.0
 */
export class Fetch extends Tag('fx-fetch/Fetch')<
  Fetch,
  (request: Request) => Effect<Fetch.SuccessType, Fetch.ErrorType, never>
>() {}
