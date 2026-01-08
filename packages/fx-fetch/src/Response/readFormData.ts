import { tryPromise } from 'effect/Effect';
import { MalformedFormDataError } from '../Cause';
import { readBodyAsFormDataOrThrow } from '../utils/readBodyAsFormDataOrThrow';
import type { Response } from './Response';

// TODO: Add examples

/**
 * Reads a FormData response.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readFormData = (response: Response) =>
  tryPromise({
    try: () => readBodyAsFormDataOrThrow(response.body),
    catch: (error) =>
      new MalformedFormDataError({
        message: 'The response body is not valid FormData and does not contain a readable body.',
        cause: error,
      }),
  });
