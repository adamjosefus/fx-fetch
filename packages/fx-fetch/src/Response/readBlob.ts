import { tryPromise } from 'effect/Effect';
import { MalformedBlobError } from '../Cause';
import { readBodyAsBlobOrThrow } from '../utils/readBodyAsBlobOrThrow';
import type { Response } from './Response';

// TODO: Add examples

/**
 * Reads a Blob response.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readBlob = (response: Response) =>
  tryPromise({
    try: () => readBodyAsBlobOrThrow(response.body),
    catch: (error) =>
      new MalformedBlobError({
        message: 'The response body is not valid Blob and does not contain a readable body.',
        cause: error,
      }),
  });
