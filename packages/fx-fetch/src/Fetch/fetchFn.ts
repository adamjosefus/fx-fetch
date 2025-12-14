import { Effect } from 'effect';
import type * as Request from '../Request';
import { Fetch } from './Fetch';

/**
 * @category Functions
 * @since 0.1.0
 */
export const fetch = Effect.fnUntraced(function* (request: Request.Request) {
  const fetchFn = yield* Fetch;
  return yield* fetchFn(request);
});
