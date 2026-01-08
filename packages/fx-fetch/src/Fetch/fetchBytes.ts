import { flatMap } from 'effect/Effect';
import type { Request } from '../Request';
import { readBytes } from '../Response';
import { fetch } from './fetchFn';

/**
 * Fetches and reads a bytes response.
 *
 * @category Functions
 * @since 0.1.0
 * @see {@link readBytes}
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
 * //       │      | MalformedBytesError,
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: './my-endpoint' });
 *
 *   //       ┌─── Uint8Array<ArrayBuffer>
 *   //       ▼
 *   const payload = yield* Fetch.fetchBytes(request);
 * });
 * ```
 */
export const fetchBytes = (request: Request) => fetch(request).pipe(flatMap(readBytes));
