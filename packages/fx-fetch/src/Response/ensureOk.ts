import { absurd, Effect } from 'effect';
import { NotOkError } from './errors';
import { isOk } from './isOk';
import * as Response from './Response';

function getNotOkReason(status: number): NotOkError['reason'] {
  if (status >= 100 && status < 200) {
    return 'informational';
  }

  // Skip 200-299 as those are OK statuses, because this function is called only for not OK responses
  // if (status >= 200 && status < 300) {
  //   return 'success';
  // }

  if (status >= 300 && status < 400) {
    return 'redirection';
  }

  if (status >= 400 && status < 500) {
    return 'client-error';
  }

  if (status >= 500 && status < 600) {
    return 'server-error';
  }

  return absurd(null as never);
}

/**
 * Ensures that the response is OK.
 *
 * @category Combinators
 * @since 0.1.0
 */
export function ensureOk(response: Response.Response) {
  return Effect.suspend((): Effect.Effect<Response.Response, NotOkError, never> => {
    if (isOk(response)) {
      return Effect.succeed(response);
    }

    return new NotOkError({
      response,
      reason: getNotOkReason(response.status),
    });
  });
}
