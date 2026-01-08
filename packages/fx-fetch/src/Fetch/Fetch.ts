import { Tag } from 'effect/Context';
import { type Effect } from 'effect/Effect';
import type { Request } from '../Request';
import { NotOkError, type Response } from '../Response';
import { AbortError, FetchError, NotAllowedError } from './errors';

/**
 * Fetch service for making or mocking HTTP requests.
 *
 * @example
 * ```
 * import { Fetch } from "fx-fetch";
 *
 * Effect.gen(function* () {
 *   const request = new Request('https://example.com');
 *
 *   const fetch = yield* Fetch.Fetch; // ◀︎── Get the Fetch service
 *   const response = yield* fetch(request);
 * }).pipe(
 *   Effect.provideService(Fetch.Fetch, Fetch.layer), // ◀︎── Provide built-in Fetch service
 *   Effect.runPromise
 * );
 * ```
 *
 * @category Services
 * @since 0.1.0
 */
export class Fetch extends Tag('fx-fetch/Fetch')<
  Fetch,
  (
    request: Request
  ) => Effect<Response, AbortError | FetchError | NotAllowedError | NotOkError, never>
>() {}
