import { Effect, Stream } from 'effect';
import { dual } from 'effect/Function';
import { MalformedReadableStreamError } from '../Cause';
import * as Response from './Response';
import { readReadableStream } from './readReadableStream';

export type Options<E> = {
  readonly onError: (error: unknown) => E;
  readonly releaseLockOnEnd?: boolean | undefined;
};

const readStreamFn = <E>(response: Response.Response, options: Options<E>) =>
  readReadableStream(response).pipe(
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
    response: Response.Response,
    options: Options<E>
  ): Effect.Effect<
    Stream.Stream<Uint8Array<ArrayBufferLike>, E, never>,
    MalformedReadableStreamError,
    never
  >;

  /**
   * Reads a ReadableStream response.
   *
   * @category Conversions
   * @since 0.1.0
   */
  <E>(
    options: Options<E>
  ): (
    response: Response.Response
  ) => Effect.Effect<
    Stream.Stream<Uint8Array<ArrayBufferLike>, E, never>,
    MalformedReadableStreamError,
    never
  >;
} = dual(2, readStreamFn);
