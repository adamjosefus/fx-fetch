import { Data } from 'effect';
import type * as Response from './Response';

/**
 * Thrown if the response is not OK. So the status code is not in the range 200-299.
 *
 * @category Errors
 * @since 0.1.0
 */
export class NotOkError extends Data.TaggedError('NotOkError')<{
  response: Response.Response;
  reason: 'client-error' | 'informational' | 'redirection' | 'server-error';
}> {}
