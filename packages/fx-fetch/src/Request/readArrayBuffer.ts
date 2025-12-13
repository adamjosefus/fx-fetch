import { Effect } from 'effect';
import { MalformedArrayBufferError } from '../Cause';
import { readBodyAsArrayBufferOrThrow } from '../utils/readBodyAsArrayBufferOrThrow';
import * as Request from './Request';

/**
 * Reads the body of a Request as an ArrayBuffer.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Effect } from 'effect';
 *
 * const request = Request.make({ url: 'https://api.example.com', method: 'POST' });
 * const arrayBuffer = await Effect.runPromise(Request.readArrayBuffer(request));
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readArrayBuffer = (self: Request.Request) =>
  Effect.tryPromise({
    try: () => readBodyAsArrayBufferOrThrow(self.body),
    catch: (error) =>
      new MalformedArrayBufferError({
        message: 'The request body is not valid ArrayBuffer and does not contain a readable body.',
        cause: error,
      }),
  });
