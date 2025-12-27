import { Effect } from 'effect';
import type * as Request from '../Request';
import { Fetch } from './Fetch';

/**
 * @category Functions
 * @since 0.1.0
 * @example
 * ```ts
 * import { Effect } from 'effect';
 * import { Fetch, Request, Response } from 'fx-fetch';
 *
 * //       ┌─── Effect.Effect<
 * //       │      void,
 * //       │      | Fetch.FetchError
 * //       │      | Fetch.AbortError
 * //       │      | Fetch.NotAllowedError
 * //       │      | Response.NotOkError,
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: './my-endpoint' });
 *
 *   //       ┌─── Response.Response
 *   //       ▼
 *   const response = yield* Fetch.fetch(request);
 * });
 *
 * // Run the program
 * program.pipe(
 *   Effect.provideService(Fetch.Fetch, Fetch.FetchLive),
 *   Effect.runFork // or Effect.runPromise etc.
 * );
 * ```
 */
export const fetch = Effect.fnUntraced(function* (request: Request.Request) {
  const fetchFn = yield* Fetch;
  return yield* fetchFn(request);
});
