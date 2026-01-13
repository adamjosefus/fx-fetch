import { catchAll, type Effect, fail, map, succeed } from 'effect/Effect';
import { type Either, left, right } from 'effect/Either';
import { NotOkError } from './errors';
import { type Response } from './Response';

/**
 * Encapsulates both success `Response` and `NotOkError` failure of an `Effect` into an `Either` type of `Response`.
 *
 * @category Outcome Encapsulation
 * @see NotOkError for more details on the error type.
 * @since 1.1.0
 * @example
 * ```ts
 * import { Effect, Either } from 'effect';
 * import { Fetch, Request, Response } from 'fx-fetch';
 *
 * //       ┌─── Effect.Effect<
 * //       │      void,
 * //       │      | Fetch.FetchError
 * //       │      | Fetch.AbortError
 * //       │      | Fetch.NotAllowedError
 * //       │      Fetch.Fetch
 * //       │    >
 * //       ▼
 * const program = Effect.gen(function* () {
 *   const request = Request.unsafeMake({ url: './my-endpoint' });
 *
 *   //       ┌─── Either.Either<
 *   //       │      Response.Response, // Ok response 200-399
 *   //       │      Response.Response // NotOk response 400-599
 *   //       │    >
 *   //       ▼
 *   const result = yield* Fetch.fetch(request).pipe(
 *     Response.notOkEither
 *   );
 * });
 * ```
 */
export function notOkEither<E, R>(
  self: Effect<Response, E | NotOkError, R>
): Effect<Either<Response, Response>, E, R> {
  return self.pipe(
    map(right),
    catchAll((err) => {
      if (!(err instanceof NotOkError)) {
        return fail(err);
      }

      return succeed(left(err.response));
    })
  );
}
