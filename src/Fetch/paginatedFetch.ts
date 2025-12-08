import { Chunk, Effect, Stream } from 'effect';
import { dual } from 'effect/Function';
import * as Request from '../Request';
import * as Response from '../Response';
import { AbortError, FetchError, NotAllowedError } from './errors';
import { Fetch } from './Fetch';
import { OnResponse, paginatedFetchStream } from './paginatedFetchStream';

function paginatedFetchFn<A, E, R>(request: Request.Request, onResponse: OnResponse<A, E, R>) {
  return paginatedFetchStream(request, onResponse).pipe(
    Stream.runCollect,
    Effect.map(Chunk.toReadonlyArray)
  );
}

// TODO: Add tests for dual APIs

/**
 * @category Functions
 * @since 0.1.0
 */
export const paginatedFetch: {
  <A, E, R>(
    request: Request.Request,
    onResponse: OnResponse<A, E, R>
  ): Effect.Effect<
    readonly A[],
    E | AbortError | FetchError | NotAllowedError | Response.NotOkError,
    R | Fetch
  >;
  <A, E, R>(
    onResponse: OnResponse<A, E, R>
  ): (
    request: Request.Request
  ) => Effect.Effect<
    readonly A[],
    E | AbortError | FetchError | NotAllowedError | Response.NotOkError,
    R | Fetch
  >;
} = dual(2, paginatedFetchFn);
