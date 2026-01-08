import { tryPromise } from 'effect/Effect';
import { MalformedFormDataError } from '../Cause';
import { readBodyAsFormDataOrThrow } from '../utils/readBodyAsFormDataOrThrow';
import { type Request } from './Request';

// TODO: Add examples

/**
 * Reads the body of a Request as FormData.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Effect } from 'effect';
 *
 * const request = Request.make({ url: 'https://api.example.com', method: 'POST' });
 * const formData = await Effect.runPromise(Request.readFormData(request));
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readFormData = (self: Request) =>
  tryPromise({
    try: () => readBodyAsFormDataOrThrow(self.body),
    catch: (error) =>
      new MalformedFormDataError({
        message: 'The request body is not valid FormData and does not contain a readable body.',
        cause: error,
      }),
  });
