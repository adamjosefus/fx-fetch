import { Context, Effect, Exit, Layer } from 'effect';
import { afterEach, beforeEach, describe, expect, expectTypeOf, test, vi } from 'vitest';
import { Fetch, Request } from '../index';
import { makeMiddlewareLayer } from './makeMiddlewareLayer';

describe('Fetch.makeMiddlewareLayer', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    mockFetch.mockClear();
    vi.spyOn(globalThis, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const request = Request.unsafeMake({ url: 'https://example.com' });

  // Type Safety Tests
  describe('type safety', () => {
    test('returns Layer<Fetch, never, never> with empty options', () => {
      const layer = makeMiddlewareLayer({});

      expectTypeOf(layer).toEqualTypeOf<Layer.Layer<Fetch.Fetch, never, never>>();
    });

    test('returns Layer with R1 requirement when mapRequest has requirements', () => {
      class Config extends Context.Tag('Config')<Config, { apiKey: string }>() {}

      const layer = makeMiddlewareLayer({
        mapRequest: (req) =>
          Effect.gen(function* () {
            const config = yield* Config;
            return Request.appendHeaders(req, { 'X-API-Key': config.apiKey });
          }),
      });

      expectTypeOf(layer).toEqualTypeOf<Layer.Layer<Fetch.Fetch, never, Config>>();
    });

    test('returns Layer with R2 requirement when mapResponse has requirements', () => {
      class Logger extends Context.Tag('Logger')<Logger, { log: (msg: string) => void }>() {}

      const layer = makeMiddlewareLayer({
        mapResponse: (response) =>
          Effect.gen(function* () {
            const logger = yield* Logger;
            logger.log(`Response status: ${response.status}`);
            return response;
          }),
      });

      expectTypeOf(layer).toEqualTypeOf<Layer.Layer<Fetch.Fetch, never, Logger>>();
    });

    test('returns Layer with R1 | R2 requirements when both have requirements', () => {
      class Config extends Context.Tag('Config')<Config, { apiKey: string }>() {}
      class Logger extends Context.Tag('Logger')<Logger, { log: (msg: string) => void }>() {}

      const layer = makeMiddlewareLayer({
        mapRequest: (req) =>
          Effect.gen(function* () {
            const config = yield* Config;
            return Request.appendHeaders(req, { 'X-API-Key': config.apiKey });
          }),
        mapResponse: (response) =>
          Effect.gen(function* () {
            const logger = yield* Logger;
            logger.log(`Response status: ${response.status}`);
            return response;
          }),
      });

      expectTypeOf(layer).toEqualTypeOf<Layer.Layer<Fetch.Fetch, never, Config | Logger>>();
    });
  });

  // Basic Functionality Tests
  describe('basic functionality', () => {
    test('empty options passes request through to fetch', async () => {
      mockFetch.mockResolvedValue(new globalThis.Response('OK', { status: 200 }));

      const middlewareLayer = makeMiddlewareLayer({});

      const result = await Effect.gen(function* () {
        const fetch = yield* Fetch.Fetch;
        return yield* fetch(request);
      }).pipe(Effect.provide(middlewareLayer), Effect.runPromiseExit);

      expect(Exit.isSuccess(result)).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    test('fetch is called with the provided request URL', async () => {
      mockFetch.mockResolvedValue(new globalThis.Response('OK', { status: 200 }));

      const middlewareLayer = makeMiddlewareLayer({});
      const customRequest = Request.unsafeMake({ url: 'https://api.example.com/users' });

      await Effect.gen(function* () {
        const fetch = yield* Fetch.Fetch;
        return yield* fetch(customRequest);
      }).pipe(Effect.provide(middlewareLayer), Effect.runPromiseExit);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const calledRequest = mockFetch.mock.calls[0][0] as globalThis.Request;
      expect(calledRequest.url).toBe('https://api.example.com/users');
    });
  });

  // mapRequest Transformation Tests
  describe('mapRequest transformation', () => {
    test('transforms request before it reaches fetch', async () => {
      mockFetch.mockResolvedValue(new globalThis.Response('OK', { status: 200 }));

      const middlewareLayer = makeMiddlewareLayer({
        mapRequest: (req) => Effect.succeed(Request.appendHeaders(req, { 'X-Custom': 'value' })),
      });

      await Effect.gen(function* () {
        const fetch = yield* Fetch.Fetch;
        return yield* fetch(request);
      }).pipe(Effect.provide(middlewareLayer), Effect.runPromiseExit);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const calledRequest = mockFetch.mock.calls[0][0] as globalThis.Request;
      expect(calledRequest.headers.get('X-Custom')).toBe('value');
    });

    test('can add authorization header via middleware', async () => {
      mockFetch.mockResolvedValue(new globalThis.Response('OK', { status: 200 }));

      const middlewareLayer = makeMiddlewareLayer({
        mapRequest: (req) =>
          Effect.succeed(Request.appendHeaders(req, { Authorization: 'Bearer token123' })),
      });

      await Effect.gen(function* () {
        const fetch = yield* Fetch.Fetch;
        return yield* fetch(request);
      }).pipe(Effect.provide(middlewareLayer), Effect.runPromiseExit);

      const calledRequest = mockFetch.mock.calls[0][0] as globalThis.Request;
      expect(calledRequest.headers.get('Authorization')).toBe('Bearer token123');
    });
  });

  // mapResponse Transformation Tests
  describe('mapResponse transformation', () => {
    test('receives response from fetch', async () => {
      mockFetch.mockResolvedValue(new globalThis.Response('Hello World', { status: 200 }));

      let capturedStatus: number | undefined;
      const middlewareLayer = makeMiddlewareLayer({
        mapResponse: (response) => {
          capturedStatus = response.status;
          return Effect.succeed(response);
        },
      });

      await Effect.gen(function* () {
        const fetch = yield* Fetch.Fetch;
        return yield* fetch(request);
      }).pipe(Effect.provide(middlewareLayer), Effect.runPromiseExit);

      expect(capturedStatus).toBe(200);
    });

    test('ensureOk is applied after mapResponse', async () => {
      mockFetch.mockResolvedValue(new globalThis.Response('Not Found', { status: 404 }));

      let mapResponseCalled = false;
      const middlewareLayer = makeMiddlewareLayer({
        mapResponse: (response) => {
          mapResponseCalled = true;
          return Effect.succeed(response);
        },
      });

      const result = await Effect.gen(function* () {
        const fetch = yield* Fetch.Fetch;
        return yield* fetch(request);
      }).pipe(Effect.provide(middlewareLayer), Effect.runPromiseExit);

      expect(mapResponseCalled).toBe(true);
      expect(Exit.isFailure(result)).toBe(true);

      if (Exit.isFailure(result)) {
        const error = result.cause.pipe((cause) =>
          cause._tag === 'Fail' ? cause.error : undefined
        );
        expect(error?._tag).toBe('NotOkError');
      }
    });
  });

  // Combined mapRequest + mapResponse Tests
  describe('combined mapRequest and mapResponse', () => {
    test('both transformations work together', async () => {
      mockFetch.mockResolvedValue(new globalThis.Response('OK', { status: 200 }));

      let requestTransformed = false;
      let responseTransformed = false;

      const middlewareLayer = makeMiddlewareLayer({
        mapRequest: (req) => {
          requestTransformed = true;
          return Effect.succeed(Request.appendHeaders(req, { 'X-Request-Id': '123' }));
        },
        mapResponse: (response) => {
          responseTransformed = true;
          return Effect.succeed(response);
        },
      });

      const result = await Effect.gen(function* () {
        const fetch = yield* Fetch.Fetch;
        return yield* fetch(request);
      }).pipe(Effect.provide(middlewareLayer), Effect.runPromiseExit);

      expect(Exit.isSuccess(result)).toBe(true);
      expect(requestTransformed).toBe(true);
      expect(responseTransformed).toBe(true);

      const calledRequest = mockFetch.mock.calls[0][0] as globalThis.Request;
      expect(calledRequest.headers.get('X-Request-Id')).toBe('123');
    });

    test('execution order: mapRequest → fetch → mapResponse → ensureOk', async () => {
      const executionOrder: string[] = [];

      mockFetch.mockImplementation(() => {
        executionOrder.push('fetch');
        return new globalThis.Response('OK', { status: 200 });
      });

      const middlewareLayer = makeMiddlewareLayer({
        mapRequest: (req) => {
          executionOrder.push('mapRequest');
          return Effect.succeed(req);
        },
        mapResponse: (response) => {
          executionOrder.push('mapResponse');
          return Effect.succeed(response);
        },
      });

      await Effect.gen(function* () {
        const fetch = yield* Fetch.Fetch;
        return yield* fetch(request);
      }).pipe(Effect.provide(middlewareLayer), Effect.runPromiseExit);

      expect(executionOrder).toEqual(['mapRequest', 'fetch', 'mapResponse']);
    });
  });

  // Error Handling Tests
  describe('error handling', () => {
    test('non-2xx response causes NotOkError', async () => {
      mockFetch.mockResolvedValue(new globalThis.Response('Server Error', { status: 500 }));

      const middlewareLayer = makeMiddlewareLayer({});

      const result = await Effect.gen(function* () {
        const fetch = yield* Fetch.Fetch;
        return yield* fetch(request);
      }).pipe(Effect.provide(middlewareLayer), Effect.runPromiseExit);

      expect(Exit.isFailure(result)).toBe(true);

      if (Exit.isFailure(result)) {
        const error = result.cause.pipe((cause) =>
          cause._tag === 'Fail' ? cause.error : undefined
        );
        expect(error?._tag).toBe('NotOkError');
      }
    });

    test('fetch errors propagate correctly', async () => {
      mockFetch.mockRejectedValue(new TypeError('Network error'));

      const middlewareLayer = makeMiddlewareLayer({});

      const result = await Effect.gen(function* () {
        const fetch = yield* Fetch.Fetch;
        return yield* fetch(request);
      }).pipe(Effect.provide(middlewareLayer), Effect.runPromiseExit);

      expect(Exit.isFailure(result)).toBe(true);

      if (Exit.isFailure(result)) {
        const error = result.cause.pipe((cause) =>
          cause._tag === 'Fail' ? cause.error : undefined
        );
        expect(error?._tag).toBe('FetchError');
      }
    });
  });

  test('middleware can access required services in mapRequest', async () => {
    mockFetch.mockResolvedValue(new globalThis.Response('OK', { status: 200 }));

    class Config extends Context.Tag('Config')<Config, { apiKey: string }>() {}

    const middlewareLayer = makeMiddlewareLayer({
      mapRequest: (req) =>
        Effect.gen(function* () {
          const config = yield* Config;
          return Request.appendHeaders(req, { 'X-API-Key': config.apiKey });
        }),
    });

    const configLayer = Layer.succeed(Config, { apiKey: 'secret-key-123' });

    const testLayer = Layer.provideMerge(middlewareLayer, configLayer);

    const result = await Effect.gen(function* () {
      const fetch = yield* Fetch.Fetch;
      return yield* fetch(request);
    }).pipe(Effect.provide(testLayer), Effect.runPromiseExit);

    expect(Exit.isSuccess(result)).toBe(true);

    const calledRequest = mockFetch.mock.calls[0][0] as globalThis.Request;
    expect(calledRequest.headers.get('X-API-Key')).toBe('secret-key-123');
  });

  test('middleware can access required services in mapResponse', async () => {
    mockFetch.mockResolvedValue(new globalThis.Response('OK', { status: 200 }));

    const logMessages: string[] = [];
    class Logger extends Context.Tag('Logger')<Logger, { log: (msg: string) => void }>() {}

    const middlewareLayer = makeMiddlewareLayer({
      mapResponse: (response) =>
        Effect.gen(function* () {
          const logger = yield* Logger;
          logger.log(`Response status: ${response.status}`);
          return response;
        }),
    });

    const loggerLayer = Layer.succeed(Logger, { log: (msg) => logMessages.push(msg) });
    const testLayer = Layer.provideMerge(middlewareLayer, loggerLayer);

    const result = await Effect.gen(function* () {
      const fetch = yield* Fetch.Fetch;
      return yield* fetch(request);
    }).pipe(Effect.provide(testLayer), Effect.runPromiseExit);

    expect(Exit.isSuccess(result)).toBe(true);
    expect(logMessages).toEqual(['Response status: 200']);
  });

  test('combined requirements from both mapRequest and mapResponse', async () => {
    mockFetch.mockResolvedValue(new globalThis.Response('OK', { status: 200 }));

    class Config extends Context.Tag('Config')<Config, { apiKey: string }>() {}
    class Logger extends Context.Tag('Logger')<Logger, { log: (msg: string) => void }>() {}

    const logMessages: string[] = [];

    const middlewareLayer = makeMiddlewareLayer({
      mapRequest: (req) =>
        Effect.gen(function* () {
          const config = yield* Config;
          return Request.appendHeaders(req, { 'X-API-Key': config.apiKey });
        }),
      mapResponse: (response) =>
        Effect.gen(function* () {
          const logger = yield* Logger;
          logger.log(`Response status: ${response.status}`);
          return response;
        }),
    });

    const configLayer = Layer.succeed(Config, { apiKey: 'combined-key' });
    const loggerLayer = Layer.succeed(Logger, { log: (msg) => logMessages.push(msg) });
    const testLayer = Layer.provideMerge(middlewareLayer, Layer.merge(configLayer, loggerLayer));

    const result = await Effect.gen(function* () {
      const fetch = yield* Fetch.Fetch;
      return yield* fetch(request);
    }).pipe(Effect.provide(testLayer), Effect.runPromiseExit);

    expect(Exit.isSuccess(result)).toBe(true);

    const calledRequest = mockFetch.mock.calls[0][0] as globalThis.Request;
    expect(calledRequest.headers.get('X-API-Key')).toBe('combined-key');
    expect(logMessages).toEqual(['Response status: 200']);
  });
});
