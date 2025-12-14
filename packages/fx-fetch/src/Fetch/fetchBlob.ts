import { Effect } from 'effect';
import type * as Request from '../Request';
import * as Response from '../Response';
import { fetch } from './fetchFn';

/**
 * Fetches and reads a blob response.
 *
 * @category Functions
 * @since 0.1.0
 */
export const fetchBlob = (request: Request.Request) =>
  fetch(request).pipe(Effect.flatMap(Response.readBlob));
