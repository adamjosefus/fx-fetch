import { Effect, Stream } from 'effect';
import { dual } from 'effect/Function';
import { MalformedReadableStreamError } from '../Cause';
import * as Request from './Request';
import { readReadableStream } from './readReadableStream';

type Options<E> = {
  readonly onError: (error: unknown) => E;
  readonly releaseLockOnEnd?: boolean | undefined;
};

const readStreamFn = <E>(self: Request.Request, options: Options<E>) =>
  readReadableStream(self).pipe(
    Effect.map((readableStream) =>
      Stream.fromReadableStream({
        evaluate: () => readableStream,
        onError: options.onError,
        releaseLockOnEnd: options.releaseLockOnEnd,
      })
    )
  );

// TODO: Add tests for dual APIs
// TODO: Add examples

/**
 * Reads a ReadableStream request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Effect } from 'effect';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const streamEffect = Request.readStream(request, {
 *   onError: (error) => new Error('Stream error')
 * });
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readStream: {
  /**
   * Reads a ReadableStream request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { Effect } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const streamEffect = Request.readStream(request, {
   *   onError: (error) => new Error('Stream error')
   * });
   * ```
   *
   * @category Conversions
   * @since 0.1.0
   */
  <E>(
    self: Request.Request,
    options: Options<E>
  ): Effect.Effect<
    Stream.Stream<Uint8Array<ArrayBufferLike>, E, never>,
    MalformedReadableStreamError,
    never
  >;

  /**
   * Reads a ReadableStream request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { Effect, pipe } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const streamEffect = pipe(
   *   request,
   *   Request.readStream({
   *     onError: (error) => new Error('Stream error')
   *   })
   * );
   * ```
   *
   * @category Conversions
   * @since 0.1.0
   */
  <E>(
    options: Options<E>
  ): (
    self: Request.Request
  ) => Effect.Effect<
    Stream.Stream<Uint8Array<ArrayBufferLike>, E, never>,
    MalformedReadableStreamError,
    never
  >;
} = dual(2, readStreamFn);
