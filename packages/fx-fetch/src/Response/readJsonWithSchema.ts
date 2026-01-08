import { type Effect, flatMap } from 'effect/Effect';
import { dual } from 'effect/Function';
import { type ParseError } from 'effect/ParseResult';
import { decodeUnknown, type Schema } from 'effect/Schema';
import { MalformedJsonError } from '../Cause';
import type { Response } from './Response';
import { readJson } from './readJson';

const readJsonWithSchemaFn = <A, I, R>(response: Response, schema: Schema<A, I, R>) =>
  readJson(response).pipe(flatMap(decodeUnknown(schema)));

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
    response: Response,
    schema: Schema<A, I, R>
  ): Effect<A, MalformedJsonError | ParseError, R>;

  /**
   * Reads a JSON response with the given schema.
   *
   * @category Conversions
   * @since 0.1.0
   */
  <A, I, R>(
    schema: Schema<A, I, R>
  ): (response: Response) => Effect<A, MalformedJsonError | ParseError, R>;
} = dual(2, readJsonWithSchemaFn);
