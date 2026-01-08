import { TaggedError } from 'effect/Data';
import type { Response } from './Response';

/**
 * Thrown if the response is not OK. So the status code is not in the range 200-299.
 *
 * @category Errors
 * @since 0.1.0
 */
export class NotOkError extends TaggedError('NotOkError')<{
  response: Response;
  reason: 'client-error' | 'informational' | 'redirection' | 'server-error';
}> {}
