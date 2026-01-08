import { tryPromise } from 'effect/Effect';
import { MalformedArrayBufferError } from '../Cause';
import { readBodyAsArrayBufferOrThrow } from '../utils/readBodyAsArrayBufferOrThrow';
import type { Response } from './Response';

// TODO: Add examples

/**
 * Reads a ArrayBuffer response.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readArrayBuffer = (response: Response) =>
  tryPromise({
    try: () => readBodyAsArrayBufferOrThrow(response.body),
    catch: (error) =>
      new MalformedArrayBufferError({
        message: 'The response body is not valid ArrayBuffer and does not contain a readable body.',
        cause: error,
      }),
  });
