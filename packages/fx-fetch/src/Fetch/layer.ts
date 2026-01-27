import { type Layer, succeed as layerSucceed } from 'effect/Layer';
import { Fetch } from './Fetch';
import { FetchLive } from './FetchLive';

/**
 * Fetch layer providing the live implementation.
 *
 * @example
 * ```ts
 * import { Effect } from 'effect';
 * import { Fetch, Request } from 'fx-fetch';
 *
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: 'https://example.com' });
 *   const response = yield* Fetch.fetch(request);
 *
 *   return response;
 * });
 *
 * program.pipe(
 *   Effect.provide(Fetch.layer), // ◀︎── Provide Fetch layer
 *   Effect.runPromise
 * );
 * ```
 *
 * @category Layers
 * @since 1.2.0
 */
export const layer: Layer<Fetch, never, never> = layerSucceed(Fetch, FetchLive);
