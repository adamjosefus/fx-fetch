import { type Effect, fnUntraced } from 'effect/Effect';
import { dual } from 'effect/Function';
import { type Option } from 'effect/Option';
import { paginateEffect, type Stream } from 'effect/Stream';
import type { Request } from '../Request';
import { NotOkError, type Response } from '../Response';
import { AbortError, FetchError, NotAllowedError } from './errors';
import { Fetch } from './Fetch';
import { fetch } from './fetchFn';

/**
 * @internal
 */
export type OnResponse<A, E, R> = (response: Response) => Effect<
  {
    readonly pageEmission: A;
    readonly nextRequest: Option<Request>;
  },
  E,
  R
>;

function paginatedFetchStreamFn<A, E, R>(request: Request, onResponse: OnResponse<A, E, R>) {
  return paginateEffect(
    request,
    fnUntraced(function* (currRequest) {
      const response = yield* fetch(currRequest);
      const { pageEmission, nextRequest } = yield* onResponse(response);
      return [pageEmission, nextRequest];
    })
  );
}

// TODO: Add tests for dual APIs

/**
 * @category Functions
 * @since 0.1.0
 * @example
 * ```ts
 * import { Effect, Option, Schema, Stream } from 'effect';
 * import { Fetch, Request, Response } from 'fx-fetch';
 *
 * class Person extends Schema.Class<Person>('Person')({
 *   id: Schema.Number,
 *   name: Schema.NonEmptyString,
 * }) { }
 *
 * const PayloadSchema = Schema.Struct({
 *   nextToken: Schema.String.pipe(Schema.optional),
 *   items: Person.pipe(Schema.Array),
 * });
 *
 * const request = Request.unsafeMake({ url: './persons' });
 *
 * //       ┌─── Stream.Stream<
 * //       │      Person[], // ◀︎── page emission
 * //       │      | Fetch.FetchError | Fetch.AbortError | Fetch.NotAllowedError | Response.NotOkError
 * //       │      | MalformedJsonError
 * //       │      | ParseError,
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Fetch.paginatedFetchStream(
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
 *       pageEmission: payload.items, // ◀︎── Person[]
 *       nextRequest, // ◀︎── Option.Option<Request.Request>
 *     };
 *   })
 * );
 * ```
 */
export const paginatedFetchStream: {
  /**
   * @category Functions
   * @since 0.1.0
   * @example
   * ```ts
   * import { Effect, Option, Schema, Stream } from 'effect';
   * import { Fetch, Request, Response } from 'fx-fetch';
   *
   * class Person extends Schema.Class<Person>('Person')({
   *   id: Schema.Number,
   *   name: Schema.NonEmptyString,
   * }) { }
   *
   * const PayloadSchema = Schema.Struct({
   *   nextToken: Schema.String.pipe(Schema.optional),
   *   items: Person.pipe(Schema.Array),
   * });
   *
   * const request = Request.unsafeMake({ url: './persons' });
   *
   * //       ┌─── Stream.Stream<
   * //       │      Person[], // ◀︎── page emission
   * //       │      | Fetch.FetchError | Fetch.AbortError | Fetch.NotAllowedError | Response.NotOkError
   * //       │      | MalformedJsonError
   * //       │      | ParseError,
   * //       │      Fetch.Fetch
   * //       │    >
   * //       ▼
   * const program = Fetch.paginatedFetchStream(
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
   *       pageEmission: payload.items, // ◀︎── Person[]
   *       nextRequest, // ◀︎── Option.Option<Request.Request>
   *     };
   *   })
   * );
   * ```
   */
  <A, E, R>(
    request: Request,
    onResponse: OnResponse<A, E, R>
  ): Stream<A, E | AbortError | FetchError | NotAllowedError | NotOkError, R | Fetch>;
  /**
   * @category Functions
   * @since 0.1.0
   * @example
   * ```ts
   * import { Effect, Option, Schema, Stream } from 'effect';
   * import { Fetch, Request, Response } from 'fx-fetch';
   *
   * class Person extends Schema.Class<Person>('Person')({
   *   id: Schema.Number,
   *   name: Schema.NonEmptyString,
   * }) { }
   *
   * const PayloadSchema = Schema.Struct({
   *   nextToken: Schema.String.pipe(Schema.optional),
   *   items: Person.pipe(Schema.Array),
   * });
   *
   * const request = Request.unsafeMake({ url: './persons' });
   *
   * //       ┌─── Stream.Stream<
   * //       │      Person[], // ◀︎── page emission
   * //       │      | Fetch.FetchError | Fetch.AbortError | Fetch.NotAllowedError | Response.NotOkError
   * //       │      | MalformedJsonError
   * //       │      | ParseError,
   * //       │      Fetch.Fetch
   * //       │    >
   * //       ▼
   * const program = Fetch.paginatedFetchStream(
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
   *       pageEmission: payload.items, // ◀︎── Person[]
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
  ) => Stream<A, E | AbortError | FetchError | NotAllowedError | NotOkError, R | Fetch>;
} = dual(2, paginatedFetchStreamFn);
