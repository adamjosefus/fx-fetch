import { type Effect, map as effectMap } from 'effect/Effect';
import { dual } from 'effect/Function';
import { fromReadableStream, type Stream } from 'effect/Stream';
import { MalformedReadableStreamError } from '../Cause';
import type { Response } from './Response';
import { readReadableStream } from './readReadableStream';

export type Options<E> = {
  readonly onError: (error: unknown) => E;
  readonly releaseLockOnEnd?: boolean | undefined;
};

const readStreamFn = <E>(response: Response, options: Options<E>) =>
  readReadableStream(response).pipe(
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
 * Reads a ReadableStream response.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readStream: {
  /**
   * Reads a ReadableStream response.
   *
   * @category Conversions
   * @since 0.1.0
   */
  <E>(
    response: Response,
    options: Options<E>
  ): Effect<Stream<Uint8Array<ArrayBufferLike>, E, never>, MalformedReadableStreamError, never>;

  /**
   * Reads a ReadableStream response.
   *
   * @category Conversions
   * @since 0.1.0
   */
  <E>(
    options: Options<E>
  ): (
    response: Response
  ) => Effect<Stream<Uint8Array<ArrayBufferLike>, E, never>, MalformedReadableStreamError, never>;
} = dual(2, readStreamFn);
