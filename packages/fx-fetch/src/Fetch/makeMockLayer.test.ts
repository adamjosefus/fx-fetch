import { Effect, Exit, Layer } from 'effect';
import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from '../Request';
import * as Response from '../Response';
import * as Url from '../Url';
import { AbortError } from './errors';
import { Fetch } from './Fetch';
import { makeMockLayer } from './makeMockLayer';

describe('Fetch.makeMockLayer', () => {
  const request = Request.unsafeMake({ url: 'https://example.com' });

  test('returns Layer type', () => {
    const mockLayer = makeMockLayer(() => Response.unsafeMake({ status: 200, ok: true }));

    expectTypeOf(mockLayer).toEqualTypeOf<Layer.Layer<Fetch, never, never>>();
  });

  test('works with plain Response', async () => {
    const mockFetch = makeMockLayer(() =>
      Response.unsafeMake({ status: 200, ok: true, body: 'Hello' })
    );

    const result = await Effect.gen(function* () {
      const fetch = yield* Fetch;
      return yield* fetch(request);
    }).pipe(Effect.provide(mockFetch), Effect.runPromiseExit);

    expect(Exit.isSuccess(result)).toBe(true);
  });

  test('returns the mocked response body', async () => {
    const mockFetch = makeMockLayer(() =>
      Response.unsafeMake({ status: 200, ok: true, body: 'Hello' })
    );

    const result = await Effect.gen(function* () {
      const fetch = yield* Fetch;
      const response = yield* fetch(request);
      return yield* Response.readText(response);
    }).pipe(Effect.provide(mockFetch), Effect.runPromiseExit);

    expect(Exit.isSuccess(result)).toBe(true);
    if (Exit.isSuccess(result)) {
      expect(result.value).toBe('Hello');
    }
  });

  test('works with Effect returning Response', async () => {
    const mockFetch = makeMockLayer(() =>
      Effect.succeed(Response.unsafeMake({ status: 200, ok: true }))
    );

    const result = await Effect.gen(function* () {
      const fetch = yield* Fetch;
      return yield* fetch(request);
    }).pipe(Effect.provide(mockFetch), Effect.runPromiseExit);

    expect(Exit.isSuccess(result)).toBe(true);
  });

  test('receives request parameter', async () => {
    const mockFetch = makeMockLayer((req) => {
      if (Url.format(req.url).includes('/users')) {
        return Response.unsafeMake({ status: 200, ok: true });
      }

      return Response.unsafeMake({ status: 404, ok: false });
    });

    const usersRequest = Request.unsafeMake({ url: 'https://example.com/users' });
    const otherRequest = Request.unsafeMake({ url: 'https://example.com/other' });

    const usersResult = await Effect.gen(function* () {
      const fetch = yield* Fetch;
      return yield* fetch(usersRequest);
    }).pipe(Effect.provide(mockFetch), Effect.runPromiseExit);

    const otherResult = await Effect.gen(function* () {
      const fetch = yield* Fetch;
      return yield* fetch(otherRequest);
    }).pipe(Effect.provide(mockFetch), Effect.runPromiseExit);

    expect(Exit.isSuccess(usersResult)).toBe(true);
    expect(Exit.isFailure(otherResult)).toBe(true);
  });

  test('fails with NotOkError for non-ok response', async () => {
    const mockFetch = makeMockLayer(() => Response.unsafeMake({ status: 500, ok: false }));

    const result = await Effect.gen(function* () {
      const fetch = yield* Fetch;
      return yield* fetch(request);
    }).pipe(Effect.provide(mockFetch), Effect.runPromiseExit);

    expect(Exit.isFailure(result)).toBe(true);

    if (Exit.isFailure(result)) {
      const error = result.cause.pipe((cause) => (cause._tag === 'Fail' ? cause.error : undefined));
      expect(error?._tag).toBe('NotOkError');
    }
  });

  test('propagates errors from Effect', async () => {
    const mockFetch = makeMockLayer(() =>
      Effect.fail(new AbortError({ message: 'Request aborted', cause: undefined }))
    );

    const result = await Effect.gen(function* () {
      const fetch = yield* Fetch;
      return yield* fetch(request);
    }).pipe(Effect.provide(mockFetch), Effect.runPromiseExit);

    expect(Exit.isFailure(result)).toBe(true);

    if (Exit.isFailure(result)) {
      const error = result.cause.pipe((cause) => (cause._tag === 'Fail' ? cause.error : undefined));
      expect(error?._tag).toBe('AbortError');
    }
  });
});
