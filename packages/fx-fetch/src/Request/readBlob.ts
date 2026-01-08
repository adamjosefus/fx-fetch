import { tryPromise } from 'effect/Effect';
import { MalformedBlobError } from '../Cause';
import { readBodyAsBlobOrThrow } from '../utils/readBodyAsBlobOrThrow';
import type { Request } from './Request';

// TODO: Add examples

/**
 * Reads the body of a Request as a Blob.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Effect } from 'effect';
 *
 * const request = Request.make({ url: 'https://api.example.com', method: 'POST' });
 * const blob = await Effect.runPromise(Request.readBlob(request));
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readBlob = (self: Request) =>
  tryPromise({
    try: () => readBodyAsBlobOrThrow(self.body),
    catch: (error) =>
      new MalformedBlobError({
        message: 'The request body is not valid Blob and does not contain a readable body.',
        cause: error,
      }),
  });
