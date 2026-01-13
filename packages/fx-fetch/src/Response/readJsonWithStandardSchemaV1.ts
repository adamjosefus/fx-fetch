import type { StandardSchemaV1 } from '@standard-schema/spec';
import { type Effect, fail, flatMap, succeed, tryPromise } from 'effect/Effect';
import { dual, pipe } from 'effect/Function';
import { ParseError, type ParseIssue, Unexpected as UnexpectedIssue } from 'effect/ParseResult';
import { MalformedJsonError } from '../Cause';
import type { Response } from './Response';
import { readJson } from './readJson';

const unexpectedErrorMessage = 'Expected value to conform to the provided standard schema.';

const readJsonWithStandardSchemaV1Fn = <A, I>(response: Response, schema: StandardSchemaV1<I, A>) =>
  readJson(response).pipe(
    flatMap((payload) =>
      tryPromise({
        try: async () => schema['~standard'].validate(payload),
        catch: (actual) => {
          const issue = new UnexpectedIssue(actual, unexpectedErrorMessage);
          return new ParseError({ issue });
        },
      }).pipe(
        flatMap((result) => {
          if (result.issues !== undefined) {
            const issue: ParseIssue = pipe(result.issues, (actual) => {
              if (actual.length === 0) {
                return new UnexpectedIssue(actual, unexpectedErrorMessage);
              }

              const actualMessages: readonly string[] = actual.map((issue) => issue.message);
              return new UnexpectedIssue(
                actual,
                `${actual.length} issues found while validating the standard schema. The issues: ${JSON.stringify(actualMessages)}`
              );
            });

            return fail(new ParseError({ issue }));
          }

          return succeed(result.value);
        })
      )
    )
  );

/**
 * Reads a JSON response with the given standard schema.
 *
 * @example
 * ```ts
 * import { Response } from 'fx-fetch';
 * import { Effect } from 'effect';
 * import { z } from 'zod'; // Or any other schema library compatible with Standard Schema
 *
 * const UserSchema = z.object({
 *   name: z.string(),
 *   age: z.number()
 * });
 *
 * const response = Response.unsafeMake({
 *   ok: true,
 *   status: 200,
 *   statusText: '200 OK',
 *   type: 'default',
 *   url: 'https://api.example.com',
 *   body: '{"name":"Alice","age":25}'
 * });
 *
 * // Data-first
 * const userEffect1 = Response.readJsonWithStandardSchemaV1(response, UserSchema);
 *
 * // Data-last (pipeable)
 * const userEffect2 = pipe(
 *   response,
 *   Response.readJsonWithStandardSchemaV1(UserSchema)
 * );
 * ```
 *
 * @category Conversions
 * @link https://standardschema.dev/schema
 * @since 1.1.0
 */
export const readJsonWithStandardSchemaV1: {
  /**
   * Reads a JSON response with the given standard schema.
   *
   * @example
   * ```ts
   * import { Response } from 'fx-fetch';
   * import { Effect } from 'effect';
   * import { z } from 'zod'; // Or any other schema library compatible with Standard Schema
   *
   * const UserSchema = z.object({
   *   name: z.string(),
   *   age: z.number()
   * });
   *
   * const response = Response.unsafeMake({
   *   ok: true,
   *   status: 200,
   *   statusText: '200 OK',
   *   type: 'default',
   *   url: 'https://api.example.com',
   *   body: '{"name":"Alice","age":25}'
   * });
   *
   * const userEffect = Response.readJsonWithStandardSchemaV1(response, UserSchema);
   * ```
   *
   * @category Conversions
   * @link https://standardschema.dev/schema
   * @since 1.1.0
   */
  <A, I>(
    response: Response,
    schema: StandardSchemaV1<I, A>
  ): Effect<A, MalformedJsonError | ParseError, never>;

  /**
   * Reads a JSON response with the given standard schema.
   *
   * @example
   * ```ts
   * import { Response } from 'fx-fetch';
   * import { Effect, pipe } from 'effect';
   * import { z } from 'zod'; // Or any other schema library compatible with Standard Schema
   *
   * const UserSchema = z.object({
   *   name: z.string(),
   *   age: z.number()
   * });
   *
   * const response = Response.unsafeMake({
   *   ok: true,
   *   status: 200,
   *   statusText: '200 OK',
   *   type: 'default',
   *   url: 'https://api.example.com',
   *   body: '{"name":"Alice","age":25}'
   * });
   *
   * const userEffect = pipe(
   *   response,
   *   Response.readJsonWithStandardSchemaV1(UserSchema)
   * );
   * ```
   *
   * @category Conversions
   * @link https://standardschema.dev/schema
   * @since 1.1.0
   */
  <A, I>(
    schema: StandardSchemaV1<I, A>
  ): (response: Response) => Effect<A, MalformedJsonError | ParseError, never>;
} = dual(2, readJsonWithStandardSchemaV1Fn);
