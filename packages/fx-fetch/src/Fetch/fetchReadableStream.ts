import { flatMap } from 'effect/Effect';
import type { Request } from '../Request';
import { readReadableStream } from '../Response';
import { fetch } from './fetchFn';

/**
 * Fetches and reads a readable stream response.
 *
 * @category Functions
 * @since 0.1.0
 * @see {@link readReadableStream}
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
 * //       │      | MalformedReadableStreamError,
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: './my-endpoint' });
 *
 *   //       ┌─── ReadableStream<Uint8Array<ArrayBuffer>>
 *   //       ▼
 *   const payload = yield* Fetch.fetchReadableStream(request);
 * });
 * ```
 */
export const fetchReadableStream = (request: Request) =>
  fetch(request).pipe(flatMap(readReadableStream));
