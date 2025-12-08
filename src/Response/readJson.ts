import { Effect } from 'effect';
import { MalformedJsonError } from '../Cause';
import { readBodyAsJsonOrThrow } from '../utils/readBodyAsJsonOrThrow';
import * as Response from './Response';

// TODO: Add examples

/**
 * Reads a JSON response.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readJson = (response: Response.Response) =>
  Effect.tryPromise({
    try: () => readBodyAsJsonOrThrow(response.body),
    catch: (error) =>
      new MalformedJsonError({
        message: 'The response body is not valid JSON and does not contain a readable body.',
        cause: error,
      }),
  });
