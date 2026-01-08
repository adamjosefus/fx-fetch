import { type Effect, flatMap } from 'effect/Effect';
import { dual } from 'effect/Function';
import { type ParseError } from 'effect/ParseResult';
import { type Schema } from 'effect/Schema';
import { MalformedJsonError } from '../Cause';
import type { Request } from '../Request';
import { NotOkError, readJsonWithSchema } from '../Response';
import { AbortError, FetchError, NotAllowedError } from './errors';
import { Fetch } from './Fetch';
import { fetch } from './fetchFn';

const fetchJsonWithSchemaFn = <A, I, R>(request: Request, schema: Schema<A, I, R>) =>
  fetch(request).pipe(flatMap(readJsonWithSchema(schema)));

/**
 * Fetches and reads a JSON response with the given schema.
 *
 * @category Conversions
 * @since 0.1.0
 * @see {@link readJsonWithSchema}
 * @example
 * ```ts
 * import { Effect, Schema } from 'effect';
 * import { Fetch, Request, Response } from 'fx-fetch';
 *
 * const UserSchema = Schema.Struct({
 *   id: Schema.Int,
 *   name: Schema.String,
 * });
 *
 * //       ┌─── Effect.Effect<
 * //       │      void,
 * //       │      | Fetch.FetchError
 * //       │      | Fetch.AbortError
 * //       │      | Fetch.NotAllowedError
 * //       │      | Response.NotOkError
 * //       │      | MalformedJsonError
 * //       │      | ParseError,
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: './my-endpoint' });
 *
 *   //       ┌─── typeof UserSchema.Type
 *   //       ▼
 *   const payload = yield* Fetch.fetchJsonWithSchema(request, UserSchema);
 * });
 * ```
 */
export const fetchJsonWithSchema: {
  /**
   * Fetches and reads a JSON response with the given schema.
   *
   * @category Conversions
   * @since 0.1.0
   * @see {@link readJsonWithSchema}
   * @example
   * ```ts
   * import { Effect, Schema } from 'effect';
   * import { Fetch, Request, Response } from 'fx-fetch';
   *
   * const UserSchema = Schema.Struct({
   *   id: Schema.Int,
   *   name: Schema.String,
   * });
   *
   * //       ┌─── Effect.Effect<
   * //       │      void,
   * //       │      | Fetch.FetchError
   * //       │      | Fetch.AbortError
   * //       │      | Fetch.NotAllowedError
   * //       │      | Response.NotOkError
   * //       │      | MalformedJsonError
   * //       │      | ParseError,
   * //       │      Fetch.Fetch
   * //       │    >
   * //       ▼
   * const program = Effect.gen(function* () {
   *   const request = Request.unsafeMake({ url: './my-endpoint' });
   *
   *   //       ┌─── typeof UserSchema.Type
   *   //       ▼
   *   const payload = yield* Fetch.fetchJsonWithSchema(request, UserSchema);
   * });
   * ```
   */
  <A, I, R>(
    request: Request,
    schema: Schema<A, I, R>
  ): Effect<
    A,
    AbortError | FetchError | NotAllowedError | NotOkError | MalformedJsonError | ParseError,
    R | Fetch
  >;

  /**
   * Fetches and reads a JSON response with the given schema.
   *
   * @category Conversions
   * @since 0.1.0
   * @see {@link readJsonWithSchema}
   * @example
   * ```ts
   * import { Effect, Schema } from 'effect';
   * import { Fetch, Request, Response } from 'fx-fetch';
   *
   * const UserSchema = Schema.Struct({
   *   id: Schema.Int,
   *   name: Schema.String,
   * });
   *
   * //       ┌─── Effect.Effect<
   * //       │      void,
   * //       │      | Fetch.FetchError
   * //       │      | Fetch.AbortError
   * //       │      | Fetch.NotAllowedError
   * //       │      | Response.NotOkError
   * //       │      | MalformedJsonError
   * //       │      | ParseError,
   * //       │      Fetch.Fetch
   * //       │    >
   * //       ▼
   * const program = Effect.gen(function* () {
   *   const request = Request.unsafeMake({ url: './my-endpoint' });
   *
   *   //       ┌─── typeof UserSchema.Type
   *   //       ▼
   *   const payload = yield* Fetch.fetchJsonWithSchema(request, UserSchema);
   * });
   * ```
   */
  <A, I, R>(
    schema: Schema<A, I, R>
  ): (
    request: Request
  ) => Effect<
    A,
    AbortError | FetchError | NotAllowedError | NotOkError | MalformedJsonError | ParseError,
    R | Fetch
  >;
} = dual(2, fetchJsonWithSchemaFn);
