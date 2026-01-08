import { tryPromise } from 'effect/Effect';
import { MalformedJsonError } from '../Cause';
import { readBodyAsJsonOrThrow } from '../utils/readBodyAsJsonOrThrow';
import type { Response } from './Response';

// TODO: Add examples

/**
 * Reads a JSON response.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readJson = (response: Response) =>
  tryPromise({
    try: () => readBodyAsJsonOrThrow(response.body),
    catch: (error) =>
      new MalformedJsonError({
        message: 'The response body is not valid JSON and does not contain a readable body.',
        cause: error,
      }),
  });
