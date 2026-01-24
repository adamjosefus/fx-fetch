import { context, type Effect, flatMap, gen, provide, succeed } from 'effect/Effect';
import { type Layer, effect as layerEffect } from 'effect/Layer';
import type { Request } from '../Request';
import { ensureOk, type Response } from '../Response';
import { executeFetch } from './executeFetch';
import { Fetch } from './Fetch';
import type { Type } from './Type';

type MiddlewareOptions<R1, R2> = {
  readonly mapRequest?: (request: Request) => Effect<Request, never, R1>;
  readonly mapResponse?: (response: Response) => Effect<Response, Fetch.ErrorType, R2>;
};

/**
 * Creates a middleware Layer that allows customizing request and response handling.
 *
 * The middleware can transform requests before they are sent and responses after they are received.
 * Both `mapRequest` and `mapResponse` are optional - if not provided, they pass through unchanged.
 *
 * @example
 * ```ts
 * import { Effect } from 'effect';
 * import { Fetch, Request } from 'fx-fetch';
 *
 * // Middleware that adds authorization header to all requests
 * const authMiddlewareLayer = Fetch.makeMiddlewareLayer({
 *   mapRequest: (request) =>
 *     Effect.succeed(
 *       Request.appendHeaders(request, { Authorization: 'Bearer token' })
 *     ),
 * });
 *
 * Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: 'https://api.example.com/data' });
 *   const response = yield* Fetch.fetch(request);
 * }).pipe(
 *   Effect.provide(authMiddlewareLayer), // ◀︎── Provide middleware layer
 *   Effect.runPromise
 * );
 * ```
 *
 * @example
 * ```ts
 * import { Context, Effect, Layer } from 'effect';
 * import { Fetch, Request } from 'fx-fetch';
 *
 * // Service for configuration
 * class Config extends Context.Tag('Config')<Config, { apiKey: string }>() {}
 *
 * // Middleware with requirements - the Layer properly tracks Config requirement
 * const authMiddlewareLayer = Fetch.makeMiddlewareLayer({
 *   mapRequest: (request) =>
 *     Effect.gen(function* () {
 *       const config = yield* Config;
 *       return Request.appendHeaders(request, { 'X-API-Key': config.apiKey });
 *     }),
 * });
 * // Type: Layer<Fetch, never, Config>
 *
 * Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: 'https://api.example.com/data' });
 *   const response = yield* Fetch.fetch(request);
 * }).pipe(
 *   Effect.provide(authMiddlewareLayer),
 *   Effect.provide(Layer.succeed(Config, { apiKey: 'secret' })),
 *   Effect.runPromise
 * );
 * ```
 *
 * @category Layers
 * @since 1.2.0
 */
export const makeMiddlewareLayer = <R1 = never, R2 = never>(
  options: MiddlewareOptions<R1, R2>
): Layer<Fetch, never, R1 | R2> => {
  const mapRequest = options.mapRequest ?? ((request: Request) => succeed(request));
  const mapResponse = options.mapResponse ?? ((response: Response) => succeed(response));

  const makeService = gen(function* () {
    const ctx = yield* context<R1 | R2>();

    const service: Type = (request: Request) =>
      mapRequest(request).pipe(
        flatMap(executeFetch),
        flatMap(mapResponse),
        flatMap(ensureOk),
        provide(ctx)
      );

    return service;
  });

  return layerEffect(Fetch, makeService);
};
