import { Effect, Option } from 'effect';
import * as Request from '../Request';
import * as Response from '../Response';
import { getErrorMessage } from '../utils/getErrorMessage';
import { AbortError, FetchError, NotAllowedError } from './errors';
import { Type } from './Type';

// TODO: Add examples

/**
 * Fetch a request and handle the response.
 *
 * @category Layers
 * @since 0.1.0
 */
export const FetchLive: Type = (request: Request.Request) =>
  Effect.tryPromise({
    try: async (signal) => {
      const jsRequest = await Request.toJsRequestPromise(request, { signal });
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

      return Effect.dieMessage(
        getErrorMessage(error, 'Unknown error occurred during fetch request')
      ) as never;
    },
  }).pipe(
    Effect.map(Response.make),
    Effect.flatMap(
      Option.match({
        onSome: Effect.succeed,
        onNone: () => Effect.dieMessage('Failed to create Response from fetch response'),
      })
    ),
    Effect.flatMap(Response.ensureOk)
  );
