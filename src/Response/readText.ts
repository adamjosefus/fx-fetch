import { Effect } from 'effect';
import { MalformedTextError } from '../Cause';
import { readBodyAsTextOrThrow } from '../utils/readBodyAsTextOrThrow';
import * as Response from './Response';

// TODO: Add examples

/**
 * Reads a text response.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readText = (response: Response.Response) =>
  Effect.tryPromise({
    try: () => readBodyAsTextOrThrow(response.body),
    catch: (error) =>
      new MalformedTextError({
        message: 'The response body is not valid text and does not contain a readable body.',
        cause: error,
      }),
  });
