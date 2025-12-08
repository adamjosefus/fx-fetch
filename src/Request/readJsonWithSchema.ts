import { Effect, ParseResult, Schema } from 'effect';
import { dual } from 'effect/Function';
import { MalformedJsonError } from '../Cause';
import * as Request from './Request';
import { readJson } from './readJson';

const readJsonWithSchemaFn = <A, I, R>(self: Request.Request, schema: Schema.Schema<A, I, R>) =>
  readJson(self).pipe(Effect.flatMap(Schema.decodeUnknown(schema)));

// TODO: Add tests
// TODO: Add tests for dual APIs

/**
 * Reads a JSON request with the given schema.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Effect, Schema } from 'effect';
 *
 * const UserSchema = Schema.Struct({
 *   name: Schema.String,
 *   age: Schema.Number
 * });
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const userEffect = Request.readJsonWithSchema(request, UserSchema);
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readJsonWithSchema: {
  /**
   * Reads a JSON request with the given schema.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { Effect, Schema } from 'effect';
   *
   * const UserSchema = Schema.Struct({
   *   name: Schema.String,
   *   age: Schema.Number
   * });
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const userEffect = Request.readJsonWithSchema(request, UserSchema);
   * ```
   *
   * @category Conversions
   * @since 0.1.0
   */
  <A, I, R>(
    self: Request.Request,
    schema: Schema.Schema<A, I, R>
  ): Effect.Effect<A, MalformedJsonError | ParseResult.ParseError, R>;

  /**
   * Reads a JSON request with the given schema.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { Effect, Schema, pipe } from 'effect';
   *
   * const UserSchema = Schema.Struct({
   *   name: Schema.String,
   *   age: Schema.Number
   * });
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const userEffect = pipe(
   *   request,
   *   Request.readJsonWithSchema(UserSchema)
   * );
   * ```
   *
   * @category Conversions
   * @since 0.1.0
   */
  <A, I, R>(
    self: Schema.Schema<A, I, R>
  ): (request: Request.Request) => Effect.Effect<A, MalformedJsonError | ParseResult.ParseError, R>;
} = dual(2, readJsonWithSchemaFn);
