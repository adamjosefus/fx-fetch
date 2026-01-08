import { flatMap } from 'effect/Effect';
import type { Request } from '../Request';
import { readJson } from '../Response';
import { fetch } from './fetchFn';

/**
 * Fetches and reads a JSON response.
 *
 * @category Functions
 * @since 0.1.0
 * @see {@link readJson}
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
 * //       │      | MalformedJsonError,
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: './my-endpoint' });
 *
 *   //       ┌─── unknown
 *   //       ▼
 *   const payload = yield* Fetch.fetchJson(request);
 * });
 * ```
 */
export const fetchJson = (request: Request) => fetch(request).pipe(flatMap(readJson));
