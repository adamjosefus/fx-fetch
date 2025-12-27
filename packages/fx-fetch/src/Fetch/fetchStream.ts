import { Effect } from 'effect';
import type * as Request from '../Request';
import { Options, readStream } from '../Response/readStream';
import { fetch } from './fetchFn';

/**
 * Fetches and reads a stream response.
 *
 * @category Functions
 * @since 0.1.0
 * @see {@link Response.readStream}
 * @example
 * ```ts
 * import { Data, Effect } from 'effect';
 * import { Fetch, Request, Response } from 'fx-fetch';
 *
 * class MyError extends Data.TaggedClass('MyError') {}
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
 *   //       ┌─── Stream<
 *   //       │      Uint8Array<ArrayBufferLike>,
 *   //       │      MyError,
 *   //       │      never
 *   //       │    >,
 *   //       ▼
 *   const stream = yield* Fetch.fetchStream(request, {
 *     onError: (err) => new MyError(),
 *     releaseLockOnEnd: true, // optional
 *   });
 * });
 * ```
 */
export const fetchStream = <E>(request: Request.Request, options: Options<E>) =>
  fetch(request).pipe(Effect.flatMap(readStream(options)));
