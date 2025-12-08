import { Context, Effect } from 'effect';
import * as Request from '../Request';
import * as Response from '../Response';
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
export class Fetch extends Context.Tag('fx-fetch/Fetch')<
  Fetch,
  (
    request: Request.Request
  ) => Effect.Effect<
    Response.Response,
    AbortError | FetchError | NotAllowedError | Response.NotOkError,
    never
  >
>() {}
