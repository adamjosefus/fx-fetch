import { flatMap } from 'effect/Effect';
import { type Request } from '../Request';
import { ensureOk } from '../Response';
import { executeFetch } from './executeFetch';
import type { Type } from './Type';

/**
 * Live implementation of the Fetch service that performs actual HTTP requests.
 *
 * @example
 * ```ts
 * import { Effect } from 'effect';
 * import { Fetch, Request, Response } from 'fx-fetch';
 *
 * //       ┌─── Effect.Effect<
 * //       │      Response.Response,
 * //       │      | Fetch.FetchError
 * //       │      | Fetch.AbortError
 * //       │      | Fetch.NotAllowedError
 * //       │      | Response.NotOkError,
 * //       │      never
 * //       │    >
 * //       ▼
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: 'https://example.com' });
 *
 *   //       ┌─── Response.Response
 *   //       ▼
 *   const response = yield* Fetch.FetchLive(request);
 *
 *   return response;
 * });
 * ```
 *
 * @category Services
 * @since 0.1.0
 */
export const FetchLive: Type = (request: Request) => executeFetch(request).pipe(flatMap(ensureOk));
