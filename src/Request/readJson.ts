import { Effect } from 'effect';
import { MalformedJsonError } from '../Cause';
import { readBodyAsJsonOrThrow } from '../utils/readBodyAsJsonOrThrow';
import * as Request from './Request';

/**
 * Reads the body of a Request as JSON.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Effect } from 'effect';
 *
 * const request = Request.make({ url: 'https://api.example.com', method: 'POST' });
 * const json = await Effect.runPromise(Request.readJson(request));
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readJson = (self: Request.Request) =>
  Effect.tryPromise({
    try: () => readBodyAsJsonOrThrow(self.body),
    catch: (error) =>
      new MalformedJsonError({
        message: 'The request body is not valid JSON and does not contain a readable body.',
        cause: error,
      }),
  });
