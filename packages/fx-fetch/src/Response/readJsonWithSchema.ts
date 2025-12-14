import { Effect, ParseResult, Schema } from 'effect';
import { dual } from 'effect/Function';
import { MalformedJsonError } from '../Cause';
import * as Response from './Response';
import { readJson } from './readJson';

const readJsonWithSchemaFn = <A, I, R>(
  response: Response.Response,
  schema: Schema.Schema<A, I, R>
) => readJson(response).pipe(Effect.flatMap(Schema.decodeUnknown(schema)));

// TODO: Add tests
// TODO: Add tests for dual APIs

/**
 * Reads a JSON response with the given schema.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const readJsonWithSchema: {
  /**
   * Reads a JSON response with the given schema.
   *
   * @category Conversions
   * @since 0.1.0
   */
  <A, I, R>(
    response: Response.Response,
    schema: Schema.Schema<A, I, R>
  ): Effect.Effect<A, MalformedJsonError | ParseResult.ParseError, R>;

  /**
   * Reads a JSON response with the given schema.
   *
   * @category Conversions
   * @since 0.1.0
   */
  <A, I, R>(
    schema: Schema.Schema<A, I, R>
  ): (
    response: Response.Response
  ) => Effect.Effect<A, MalformedJsonError | ParseResult.ParseError, R>;
} = dual(2, readJsonWithSchemaFn);
