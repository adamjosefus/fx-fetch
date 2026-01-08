import { flatMap } from 'effect/Effect';
import type { Request } from '../Request';
import { readFormData } from '../Response';
import { fetch } from './fetchFn';

/**
 * Fetches and reads a form data response.
 *
 * @category Functions
 * @since 0.1.0
 * @see {@link readFormData}
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
 * //       │      | MalformedFormDataError,
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: './my-endpoint' });
 *
 *   //       ┌─── FormData
 *   //       ▼
 *   const payload = yield* Fetch.fetchFormData(request);
 * });
 * ```
 */
export const fetchFormData = (request: Request) => fetch(request).pipe(flatMap(readFormData));
