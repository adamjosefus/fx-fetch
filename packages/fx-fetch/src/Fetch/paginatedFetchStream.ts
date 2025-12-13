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
 */
export const paginatedFetchStream: {
  <A, E, R>(
    request: Request.Request,
    onResponse: OnResponse<A, E, R>
  ): Stream.Stream<
    A,
    E | AbortError | FetchError | NotAllowedError | Response.NotOkError,
    R | Fetch
  >;
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
