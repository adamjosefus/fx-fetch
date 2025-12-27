import { Effect, Option, Stream } from 'effect';
import { dual } from 'effect/Function';
import * as Request from '../Request';
import * as Response from '../Response';
import { AbortError, FetchError, NotAllowedError } from './errors';
import { Fetch } from './Fetch';
import { fetch } from './fetchFn';

/**
 * @internal
 */
export type OnResponse<A, E, R> = (response: Response.Response) => Effect.Effect<
  {
    readonly pageEmission: A;
    readonly nextRequest: Option.Option<Request.Request>;
  },
  E,
  R
>;

function paginatedFetchStreamFn<A, E, R>(
  request: Request.Request,
  onResponse: OnResponse<A, E, R>
) {
  return Stream.paginateEffect(
    request,
    Effect.fnUntraced(function* (currRequest) {
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
    request: Request.Request,
    onResponse: OnResponse<A, E, R>
  ): Stream.Stream<
    A,
    E | AbortError | FetchError | NotAllowedError | Response.NotOkError,
    R | Fetch
  >;
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
    request: Request.Request
  ) => Stream.Stream<
    A,
    E | AbortError | FetchError | NotAllowedError | Response.NotOkError,
    R | Fetch
  >;
} = dual(2, paginatedFetchStreamFn);
