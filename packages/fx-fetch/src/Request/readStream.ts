import { type Effect, map as effectMap } from 'effect/Effect';
import { dual } from 'effect/Function';
import { fromReadableStream, type Stream } from 'effect/Stream';
import { MalformedReadableStreamError } from '../Cause';
import type { Request } from './Request';
import { readReadableStream } from './readReadableStream';

type Options<E> = {
  readonly onError: (error: unknown) => E;
  readonly releaseLockOnEnd?: boolean | undefined;
};

const readStreamFn = <E>(self: Request, options: Options<E>) =>
  readReadableStream(self).pipe(
    effectMap((readableStream) =>
      fromReadableStream({
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
    self: Request,
    options: Options<E>
  ): Effect<Stream<Uint8Array<ArrayBufferLike>, E, never>, MalformedReadableStreamError, never>;

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
    self: Request
  ) => Effect<Stream<Uint8Array<ArrayBufferLike>, E, never>, MalformedReadableStreamError, never>;
} = dual(2, readStreamFn);
