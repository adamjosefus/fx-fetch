import { toReadonlyArray } from 'effect/Chunk';
import { type Effect, map } from 'effect/Effect';
import { dual } from 'effect/Function';
import { runCollect } from 'effect/Stream';
import type { Request } from '../Request';
import { NotOkError } from '../Response';
import { AbortError, FetchError, NotAllowedError } from './errors';
import { Fetch } from './Fetch';
import { type OnResponse, paginatedFetchStream } from './paginatedFetchStream';

function paginatedFetchFn<A, E, R>(request: Request, onResponse: OnResponse<A, E, R>) {
  return paginatedFetchStream(request, onResponse).pipe(runCollect, map(toReadonlyArray));
}

// TODO: Add tests for dual APIs

/**
 * @category Functions
 * @since 0.1.0
 * @see {@link paginatedFetchStream}
 * @example
 * ```ts
 * import { Effect, Option, Schema } from 'effect';
 * import { Fetch, Request, Response } from 'fx-fetch';
 *
 * class Person extends Schema.Class<Person>('Person')({
 *   id: Schema.Number,
 *   name: Schema.NonEmptyString,
 * }) {}
 *
 * const PayloadSchema = Schema.Struct({
 *   nextToken: Schema.String.pipe(Schema.optional),
 *   items: Person.pipe(Schema.Array),
 * });
 *
 * const request = Request.unsafeMake({ url: './persons' });
 *
 * //       ┌─── Effect.Effect<
 * //       │      Person[][], // ◀︎── array of pages
 * //       │      | Fetch.FetchError | Fetch.AbortError | Fetch.NotAllowedError | Response.NotOkError
 * //       │      | MalformedJsonError
 * //       │      | ParseError,
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Fetch.paginatedFetch(
 *   request,
 *   Effect.fn(function* (lastResponse) {
 *     const payload = yield* Response.readJsonWithSchema(lastResponse, PayloadSchema);
 *
 *     const nextToken = Option.fromNullable(payload.nextToken);
 *     const nextRequest = nextToken.pipe(
 *       Option.map((token) => Request.setUrlSearchParam(request, 'token', token))
 *     );
 *
 *     return {
 *       pageEmission: payload.items,  // ◀︎── Person[]
 *       nextRequest, // ◀︎── Option.Option<Request.Request>
 *     };
 *   })
 * );
 * ```
 */
export const paginatedFetch: {
  /**
   * @category Functions
   * @since 0.1.0
   * @see {@link paginatedFetchStream}
   * @example
   * ```ts
   * import { Effect, Option, Schema } from 'effect';
   * import { Fetch, Request, Response } from 'fx-fetch';
   *
   * class Person extends Schema.Class<Person>('Person')({
   *   id: Schema.Number,
   *   name: Schema.NonEmptyString,
   * }) {}
   *
   * const PayloadSchema = Schema.Struct({
   *   nextToken: Schema.String.pipe(Schema.optional),
   *   items: Person.pipe(Schema.Array),
   * });
   *
   * const request = Request.unsafeMake({ url: './persons' });
   *
   * //       ┌─── Effect.Effect<
   * //       │      Person[][], // ◀︎── array of pages
   * //       │      | Fetch.FetchError | Fetch.AbortError | Fetch.NotAllowedError | Response.NotOkError
   * //       │      | MalformedJsonError
   * //       │      | ParseError,
   * //       │      Fetch.Fetch
   * //       │    >
   * //       ▼
   * const program = Fetch.paginatedFetch(
   *   request,
   *   Effect.fn(function* (lastResponse) {
   *     const payload = yield* Response.readJsonWithSchema(lastResponse, PayloadSchema);
   *
   *     const nextToken = Option.fromNullable(payload.nextToken);
   *     const nextRequest = nextToken.pipe(
   *       Option.map((token) => Request.setUrlSearchParam(request, 'token', token))
   *     );
   *
   *     return {
   *       pageEmission: payload.items,  // ◀︎── Person[]
   *       nextRequest, // ◀︎── Option.Option<Request.Request>
   *     };
   *   })
   * );
   * ```
   */
  <A, E, R>(
    request: Request,
    onResponse: OnResponse<A, E, R>
  ): Effect<readonly A[], E | AbortError | FetchError | NotAllowedError | NotOkError, R | Fetch>;
  /**
   * @category Functions
   * @since 0.1.0
   * @see {@link paginatedFetchStream}
   * @example
   * ```ts
   * import { Effect, Option, Schema } from 'effect';
   * import { Fetch, Request, Response } from 'fx-fetch';
   *
   * class Person extends Schema.Class<Person>('Person')({
   *   id: Schema.Number,
   *   name: Schema.NonEmptyString,
   * }) {}
   *
   * const PayloadSchema = Schema.Struct({
   *   nextToken: Schema.String.pipe(Schema.optional),
   *   items: Person.pipe(Schema.Array),
   * });
   *
   * const request = Request.unsafeMake({ url: './persons' });
   *
   * //       ┌─── Effect.Effect<
   * //       │      Person[][], // ◀︎── array of pages
   * //       │      | Fetch.FetchError | Fetch.AbortError | Fetch.NotAllowedError | Response.NotOkError
   * //       │      | MalformedJsonError
   * //       │      | ParseError,
   * //       │      Fetch.Fetch
   * //       │    >
   * //       ▼
   * const program = Fetch.paginatedFetch(
   *   request,
   *   Effect.fn(function* (lastResponse) {
   *     const payload = yield* Response.readJsonWithSchema(lastResponse, PayloadSchema);
   *
   *     const nextToken = Option.fromNullable(payload.nextToken);
   *     const nextRequest = nextToken.pipe(
   *       Option.map((token) => Request.setUrlSearchParam(request, 'token', token))
   *     );
   *
   *     return {
   *       pageEmission: payload.items,  // ◀︎── Person[]
   *       nextRequest, // ◀︎── Option.Option<Request.Request>
   *     };
   *   })
   * );
   * ```
   */
  <A, E, R>(
    onResponse: OnResponse<A, E, R>
  ): (
    request: Request
  ) => Effect<readonly A[], E | AbortError | FetchError | NotAllowedError | NotOkError, R | Fetch>;
} = dual(2, paginatedFetchFn);
