import { Effect, Stream } from 'effect';
import { dual } from 'effect/Function';
import { MalformedReadableStreamError } from '../Cause';
import type * as Request from '../Request';
import { NotOkError } from '../Response';
import { Options, readStream } from '../Response/readStream';
import { AbortError, FetchError, NotAllowedError } from './errors';
import { Fetch } from './Fetch';
import { fetch } from './fetchFn';

const fetchStreamFn = <E>(request: Request.Request, options: Options<E>) =>
  fetch(request).pipe(Effect.flatMap(readStream(options)));

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
export const fetchStream: {
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
  <E>(
    request: Request.Request,
    options: Options<E>
  ): Effect.Effect<
    Stream.Stream<Uint8Array<ArrayBufferLike>, E, never>,
    AbortError | FetchError | NotAllowedError | NotOkError | MalformedReadableStreamError,
    Fetch
  >;

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
  <E>(
    options: Options<E>
  ): (
    request: Request.Request
  ) => Effect.Effect<
    Stream.Stream<Uint8Array<ArrayBufferLike>, E, never>,
    AbortError | FetchError | NotAllowedError | NotOkError | MalformedReadableStreamError,
    Fetch
  >;
} = dual(2, fetchStreamFn);
