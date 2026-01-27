import { type Effect, flatMap, isEffect, succeed } from 'effect/Effect';
import { type Layer, succeed as layerSucceed } from 'effect/Layer';
import type { Request } from '../Request';
import { ensureOk } from '../Response';
import { Fetch } from './Fetch';
import type { Type } from './Type';

type MockFn = (
  request: Request
) => Fetch.SuccessType | Effect<Fetch.SuccessType, Fetch.ErrorType, never>;

/**
 * Creates a mock Fetch layer for testing purposes.
 *
 * The mock function can return either a plain `Response` or an `Effect<Response, E>`
 * for simulating both successful responses and error scenarios.
 *
 * @example
 * ```ts
 * import { Effect } from 'effect';
 * import { Fetch, Request, Response } from 'fx-fetch';
 *
 * // Mock returning a simple Response
 * const mockLayer = Fetch.makeMockLayer(() =>
 *   Response.unsafeMake({ status: 200, ok: true, body: 'Hello' })
 * );
 *
 * Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: 'https://example.com' });
 *   const response = yield* Fetch.fetch(request);
 * }).pipe(
 *   Effect.provide(mockLayer), // ◀︎── Provide mock layer
 *   Effect.runPromise
 * );
 * ```
 *
 * @example
 * ```ts
 * import { Effect } from 'effect';
 * import { Fetch, Request, Response, Url } from 'fx-fetch';
 *
 * // Mock using the request to return different responses
 * const mockLayer = Fetch.makeMockLayer((request) => {
 *   if (Url.format(request.url).includes('/users')) {
 *     return Response.unsafeMake({ status: 200, ok: true, body: JSON.stringify([{ id: 1 }]) });
 *   }
 *
 *   return Response.unsafeMake({ status: 404, ok: false });
 * });
 * ```
 *
 * @category Layers
 * @since 1.2.0
 */
export const makeMockLayer = (mockFn: MockFn): Layer<Fetch, never, never> => {
  const service: Type = (request: Request) => {
    const result = mockFn(request);
    const effect = isEffect(result) ? result : succeed(result);
    return effect.pipe(flatMap(ensureOk));
  };

  return layerSucceed(Fetch, service);
};
