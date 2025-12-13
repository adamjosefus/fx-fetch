import { Effect, ParseResult, Schema } from 'effect';
import { dual } from 'effect/Function';
import * as Cause from '../Cause';
import type * as Request from '../Request';
import * as Response from '../Response';
import { AbortError, FetchError, NotAllowedError } from './errors';
import { Fetch } from './Fetch';
import { fetch } from './fetchFn';

const fetchJsonWithSchemaFn = <A, I, R>(request: Request.Request, schema: Schema.Schema<A, I, R>) =>
  fetch(request).pipe(Effect.flatMap(Response.readJsonWithSchema(schema)));

/**
 * Fetches and reads a JSON response with the given schema.
 *
 * @category Conversions
 * @since 0.1.0
 */
export const fetchJsonWithSchema: {
  /**
   * Fetches and reads a JSON response with the given schema.
   *
   * @category Conversions
   * @since 0.1.0
   */
  <A, I, R>(
    request: Request.Request,
    schema: Schema.Schema<A, I, R>
  ): Effect.Effect<
    A,
    | AbortError
    | FetchError
    | NotAllowedError
    | Response.NotOkError
    | Cause.MalformedJsonError
    | ParseResult.ParseError,
    R | Fetch
  >;

  /**
   * Fetches and reads a JSON response with the given schema.
   *
   * @category Conversions
   * @since 0.1.0
   */
  <A, I, R>(
    schema: Schema.Schema<A, I, R>
  ): (
    request: Request.Request
  ) => Effect.Effect<
    A,
    | AbortError
    | FetchError
    | NotAllowedError
    | Response.NotOkError
    | Cause.MalformedJsonError
    | ParseResult.ParseError,
    R | Fetch
  >;
} = dual(2, fetchJsonWithSchemaFn);
