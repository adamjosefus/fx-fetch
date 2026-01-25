import { type Effect, flatMap } from 'effect/Effect';
import { dual } from 'effect/Function';
import { type ParseError } from 'effect/ParseResult';
import { decodeUnknown, type Schema } from 'effect/Schema';
import { MalformedJsonError } from '../Cause';
import type { Request } from './Request';
import { readJson } from './readJson';

const readJsonWithSchemaFn = <A, I, R>(self: Request, schema: Schema<A, I, R>) =>
  readJson(self).pipe(flatMap(decodeUnknown(schema)));

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
  <A, I, R>(self: Request, schema: Schema<A, I, R>): Effect<A, MalformedJsonError | ParseError, R>;

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
    self: Schema<A, I, R>
  ): (request: Request) => Effect<A, MalformedJsonError | ParseError, R>;
} = dual(2, readJsonWithSchemaFn);
