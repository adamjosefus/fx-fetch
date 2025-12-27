import { Effect, Either } from 'effect';
import { NotOkError } from './errors';
import { Response } from './Response';

/**
 * Encapsulates both success `Response` and `NotOkError` failure of an `Effect` into an `Either` type of `Response`.
 *
 * @category Outcome Encapsulation
 * @since 1.2.0
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
 *     Response.either
 *   );
 * });
 * ```
 */
export function either<E, R>(
  self: Effect.Effect<Response, E | NotOkError, R>
): Effect.Effect<Either.Either<Response, Response>, E, R> {
  return self.pipe(
    Effect.map(Either.right),
    Effect.catchTag(
      'NotOkError',
      (err): Effect.Effect<Either.Either<never, Response>, never, never> => {
        if (!(err instanceof NotOkError)) {
          return Effect.fail(err as never);
        }

        return Effect.succeed(Either.left(err.response));
      }
    )
  );
}
