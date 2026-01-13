import { Effect, Either, Exit } from 'effect';
import { describe, expect, test } from 'vitest';
import * as Response from '.';

describe('Response.notOkEither', () => {
  test('returns Right with response when effect succeeds', async () => {
    const response = Response.unsafeMake({
      ok: true,
      status: 200,
      statusText: '200 OK',
      type: 'default',
      url: 'https://example.com',
      body: 'Success',
    });

    const effect = Effect.succeed(response);
    const result = await Response.notOkEither(effect).pipe(Effect.runPromiseExit);

    expect(Exit.isSuccess(result)).toBe(true);

    if (Exit.isSuccess(result)) {
      expect(Either.isRight(result.value)).toBe(true);

      if (Either.isRight(result.value)) {
        expect(result.value.right).toBe(response);
      }
    }
  });

  test('returns Left with response when effect fails with NotOkError', async () => {
    const errorResponse = Response.unsafeMake({
      ok: false,
      status: 404,
      statusText: '404 Not Found',
      type: 'default',
      url: 'https://example.com',
      body: 'Not found',
    });

    const notOkError = new Response.NotOkError({
      response: errorResponse,
      reason: 'client-error',
    });

    const effect = Effect.fail(notOkError);
    const result = await Response.notOkEither(effect).pipe(Effect.runPromiseExit);

    expect(Exit.isSuccess(result)).toBe(true);

    if (Exit.isSuccess(result)) {
      expect(Either.isLeft(result.value)).toBe(true);

      if (Either.isLeft(result.value)) {
        expect(result.value.left).toBe(errorResponse);
      }
    }
  });

  test('returns Left with response for 500 server error', async () => {
    const errorResponse = Response.unsafeMake({
      ok: false,
      status: 500,
      statusText: '500 Internal Server Error',
      type: 'default',
      url: 'https://example.com',
      body: 'Server error',
    });

    const notOkError = new Response.NotOkError({
      response: errorResponse,
      reason: 'server-error',
    });

    const effect = Effect.fail(notOkError);
    const result = await Response.notOkEither(effect).pipe(Effect.runPromiseExit);

    expect(Exit.isSuccess(result)).toBe(true);

    if (Exit.isSuccess(result)) {
      expect(Either.isLeft(result.value)).toBe(true);

      if (Either.isLeft(result.value)) {
        expect(result.value.left).toBe(errorResponse);
      }
    }
  });

  test('still fails when effect fails with non-NotOkError', async () => {
    class CustomError {
      readonly _tag = 'CustomError';
      constructor(readonly message: string) {}
    }

    const customError = new CustomError('Some other error');
    const effect = Effect.fail(customError);
    const result = await Response.notOkEither(effect).pipe(Effect.runPromiseExit);

    expect(Exit.isFailure(result)).toBe(true);

    if (Exit.isFailure(result)) {
      expect(result.cause).toBeDefined();
    }
  });

  test('preserves response data in Right case', async () => {
    const responseBody = 'Test body content';
    const response = Response.unsafeMake({
      ok: true,
      status: 201,
      statusText: '201 Created',
      type: 'default',
      url: 'https://example.com/resource',
      body: responseBody,
    });

    const effect = Effect.succeed(response);
    const result = await Response.notOkEither(effect).pipe(Effect.runPromise);

    expect(Either.isRight(result)).toBe(true);

    if (Either.isRight(result)) {
      expect(result.right.status).toBe(201);
      expect(result.right.statusText).toBe('201 Created');
      expect(result.right).toBe(response);
    }
  });

  test('preserves response data in Left case', async () => {
    const responseBody = 'Unauthorized';
    const errorResponse = Response.unsafeMake({
      ok: false,
      status: 401,
      statusText: '401 Unauthorized',
      type: 'default',
      url: 'https://example.com/protected',
      body: responseBody,
    });

    const notOkError = new Response.NotOkError({
      response: errorResponse,
      reason: 'client-error',
    });

    const effect = Effect.fail(notOkError);
    const result = await Response.notOkEither(effect).pipe(Effect.runPromise);

    expect(Either.isLeft(result)).toBe(true);

    if (Either.isLeft(result)) {
      expect(result.left.status).toBe(401);
      expect(result.left.statusText).toBe('401 Unauthorized');
      expect(result.left).toBe(errorResponse);
    }
  });
});
