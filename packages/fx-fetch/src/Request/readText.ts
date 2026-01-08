import { tryPromise } from 'effect/Effect';
import { MalformedTextError } from '../Cause';
import { readBodyAsTextOrThrow } from '../utils/readBodyAsTextOrThrow';
import { type Request } from './Request';

// TODO: Add tests

/**
 * Reads a text request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Effect } from 'effect';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const textEffect = Request.readText(request);
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readText = (request: Request) =>
  tryPromise({
    try: () => readBodyAsTextOrThrow(request.body),
    catch: (error) =>
      new MalformedTextError({
        message: 'The request body is not valid text and does not contain a readable body.',
        cause: error,
      }),
  });
