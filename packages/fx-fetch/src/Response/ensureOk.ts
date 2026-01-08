import { absurd } from 'effect';
import { type Effect, succeed, suspend } from 'effect/Effect';
import { NotOkError } from './errors';
import { isOk } from './isOk';
import type { Response } from './Response';

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
export function ensureOk(response: Response) {
  return suspend((): Effect<Response, NotOkError, never> => {
    if (isOk(response)) {
      return succeed(response);
    }

    return new NotOkError({
      response,
      reason: getNotOkReason(response.status),
    });
  });
}
