import { Effect } from 'effect';
import type * as Request from '../Request';
import * as Response from '../Response';
import { fetch } from './fetchFn';

/**
 * Fetches and reads a blob response.
 *
 * @category Functions
 * @since 0.1.0
 * @see {@link Response.readBlob}
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
 * //       │      | MalformedBlobError,
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: './my-endpoint' });
 *
 *   //       ┌─── Blob
 *   //       ▼
 *   const payload = yield* Fetch.fetchBlob(request);
 * });
 * ```
 */
export const fetchBlob = (request: Request.Request) =>
  fetch(request).pipe(Effect.flatMap(Response.readBlob));
