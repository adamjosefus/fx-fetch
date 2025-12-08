import { Effect } from 'effect';
import type * as Request from '../Request';
import * as Response from '../Response';
import { fetch } from './fetchFn';

/**
 * Fetches and reads a JSON response.
 *
 * @category Functions
 * @since 0.1.0
 */
export const fetchJson = (request: Request.Request) =>
  fetch(request).pipe(Effect.flatMap(Response.readJson));
