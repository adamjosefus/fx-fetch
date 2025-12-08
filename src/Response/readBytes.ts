import { Effect } from 'effect';
import { MalformedBytesError } from '../Cause';
import { readBodyAsBytesOrThrow } from '../utils/readBodyAsBytesOrThrow';
import * as Response from './Response';

// TODO: Add examples

/**
 * Reads a Bytes response.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readBytes = (response: Response.Response) =>
  Effect.tryPromise({
    try: () => readBodyAsBytesOrThrow(response.body),
    catch: (error) =>
      new MalformedBytesError({
        message: 'The response body is not valid Bytes and does not contain a readable body.',
        cause: error,
      }),
  });
