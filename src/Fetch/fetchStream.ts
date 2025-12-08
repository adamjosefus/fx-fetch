import { Effect } from 'effect';
import type * as Request from '../Request';
import { Options, readStream } from '../Response/readStream';
import { fetch } from './fetchFn';

/**
 * Fetches and reads a stream response.
 *
 * @category Functions
 * @since 0.1.0
 */
export const fetchStream = <E>(request: Request.Request, options: Options<E>) =>
  fetch(request).pipe(Effect.flatMap(readStream(options)));
