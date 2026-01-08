import { RuntimeException } from 'effect/Cause';
import { dieMessage, flatMap, map, succeed, tryPromise } from 'effect/Effect';
import { match } from 'effect/Option';
import { type Request, toJsRequestPromise } from '../Request';
import { ensureOk, make } from '../Response';
import { getErrorMessage } from '../utils/getErrorMessage';
import { AbortError, FetchError, NotAllowedError } from './errors';
import type { Type } from './Type';

// TODO: Add examples

/**
 * Fetch a request and handle the response.
 *
 * @category Layers
 * @since 0.1.0
 */
export const FetchLive: Type = (request: Request) =>
  tryPromise({
    try: async (signal) => {
      const jsRequest = await toJsRequestPromise(request, { signal });
      return await globalThis.fetch(jsRequest);
    },
    catch(error) {
      if (error instanceof TypeError) {
        return new FetchError({
          message: error.message,
          cause: error,
        });
      }

      if (typeof error === 'object' && error !== null && 'name' in error) {
        if (error.name === 'AbortError') {
          return new AbortError({
            message: getErrorMessage(error, 'Http request aborted'),
            cause: error,
          });
        }

        if (error.name === 'NotAllowedError') {
          return new NotAllowedError({
            message: getErrorMessage(error, 'Http request not allowed'),
            cause: error,
          });
        }
      }

      throw new RuntimeException(
        getErrorMessage(error, 'Unknown error occurred during fetch request')
      );
    },
  }).pipe(
    map(make),
    flatMap(
      match({
        onSome: succeed,
        onNone: () => dieMessage('Failed to create Response from fetch response'),
      })
    ),
    flatMap(ensureOk)
  );
