import { tryPromise } from 'effect/Effect';
import { MalformedBytesError } from '../Cause';
import { readBodyAsBytesOrThrow } from '../utils/readBodyAsBytesOrThrow';
import type { Request } from './Request';

// TODO: Add examples

/**
 * Reads the body of a Request as Bytes.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Effect } from 'effect';
 *
 * const request = Request.make({ url: 'https://api.example.com', method: 'POST' });
 * const bytes = await Effect.runPromise(Request.readBytes(request));
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readBytes = (self: Request) =>
  tryPromise({
    try: () => readBodyAsBytesOrThrow(self.body),
    catch: (error) =>
      new MalformedBytesError({
        message: 'The request body is not valid Bytes and does not contain a readable body.',
        cause: error,
      }),
  });
