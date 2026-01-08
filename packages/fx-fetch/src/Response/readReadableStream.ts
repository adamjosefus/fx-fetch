import { tryPromise } from 'effect/Effect';
import { MalformedReadableStreamError } from '../Cause';
import { readBodyAsReadableStreamOrThrow } from '../utils/readBodyAsReadableStreamOrThrow';
import type { Response } from './Response';

// TODO: Add tests

/**
 * Reads a ReadableStream response.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readReadableStream = (response: Response) =>
  tryPromise({
    try: () => readBodyAsReadableStreamOrThrow(response.body),
    catch: (error) =>
      new MalformedReadableStreamError({
        message:
          'The response body is not valid ReadableStream and does not contain a readable body.',
        cause: error,
      }),
  });
