import { flatMap } from 'effect/Effect';
import type { Request } from '../Request';
import { readText } from '../Response';
import { fetch } from './fetchFn';

/**
 * Fetches and reads a text response.
 *
 * @category Functions
 * @since 0.1.0
 * @see {@link readText}
 * @example
 * ```ts
 * import { Effect } from 'effect';
 * import { Fetch, Request, Response } from 'fx-fetch';
 *
 * //       ┌─── Effect.Effect<
 * //       │      void,
 * //       │      | Fetch.FetchError
 * //       │      | Fetch.AbortError
 * //       │      | Fetch.NotAllowedError
 * //       │      | Response.NotOkError
 * //       │      | MalformedTextError,
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: './my-endpoint' });
 *
 *   //       ┌─── string
 *   //       ▼
 *   const payload = yield* Fetch.fetchText(request);
 * });
 * ```
 */
export const fetchText = (request: Request) => fetch(request).pipe(flatMap(readText));
