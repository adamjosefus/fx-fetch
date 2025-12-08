import { Effect } from 'effect';
import { MalformedReadableStreamError } from '../Cause';
import { readBodyAsReadableStreamOrThrow } from '../utils/readBodyAsReadableStreamOrThrow';
import * as Request from './Request';

// TODO: Add tests

/**
 * Reads a ReadableStream request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Effect } from 'effect';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const streamEffect = Request.readReadableStream(request);
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readReadableStream = (self: Request.Request) =>
  Effect.tryPromise({
    try: () => readBodyAsReadableStreamOrThrow(self.body),
    catch: (error) =>
      new MalformedReadableStreamError({
        message:
          'The request body is not valid ReadableStream and does not contain a readable body.',
        cause: error,
      }),
  });
