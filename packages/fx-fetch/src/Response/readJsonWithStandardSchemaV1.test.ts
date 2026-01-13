import type { StandardSchemaV1 } from '@standard-schema/spec';
import { Effect, Exit } from 'effect';
import { describe, expect, expectTypeOf, test } from 'vitest';
import { MalformedJsonError } from '../Cause';
import * as Response from '.';

describe('Response.readJsonWithStandardSchemaV1', () => {
  const userSchema: StandardSchemaV1<{
    readonly name: string;
    readonly age: number;
  }> = {
    '~standard': {
      version: 1,
      vendor: 'standard-schema/mock',
      validate: (value: unknown) => {
        if (value === null || typeof value !== 'object') {
          return {
            issues: [{ message: 'Expected an object' }],
          };
        }

        if (
          'name' in value &&
          typeof value.name === 'string' &&
          'age' in value &&
          typeof value.age === 'number'
        ) {
          value;
          return {
            value: value as { name: string; age: number },
            issues: undefined,
          };
        }

        return {
          issues: [{ message: 'Missing required property: age' }],
        };
      },
    },
  };

  describe('dual API', () => {
    test('both forms return the same result for valid data', async () => {
      const response = Response.unsafeMake({
        ok: true,
        status: 200,
        statusText: '200 OK',
        type: 'default',
        url: 'https://example.com',
        body: `{"name":"John","age":30}`,
      });

      const a = await Response.readJsonWithStandardSchemaV1(response, userSchema).pipe(
        Effect.runPromiseExit
      );
      const b = await Response.readJsonWithStandardSchemaV1(userSchema)(response).pipe(
        Effect.runPromiseExit
      );

      expect(a).toEqual(b);
      expectTypeOf(a).toEqualTypeOf(b);
    });

    test('both forms return the same error for invalid data', async () => {
      const response = Response.unsafeMake({
        ok: true,
        status: 200,
        statusText: '200 OK',
        type: 'default',
        url: 'https://example.com',
        body: `{"name":"John"}`,
      });

      const a = await Response.readJsonWithStandardSchemaV1(response, userSchema).pipe(
        Effect.runPromiseExit
      );
      const b = await Response.readJsonWithStandardSchemaV1(userSchema)(response).pipe(
        Effect.runPromiseExit
      );

      expect(Exit.isFailure(a)).toBe(true);
      expect(Exit.isFailure(b)).toBe(true);
      expect(a).toEqual(b);
    });
  });

  describe('successful validation', () => {
    test('parses and validates valid JSON', async () => {
      const response = Response.unsafeMake({
        ok: true,
        status: 200,
        statusText: '200 OK',
        type: 'default',
        url: 'https://example.com',
        body: `{"name":"Alice","age":25}`,
      });

      const result = await Response.readJsonWithStandardSchemaV1(response, userSchema).pipe(
        Effect.runPromise
      );

      expect(result).toEqual({ name: 'Alice', age: 25 });
    });
  });

  describe('malformed JSON', () => {
    test('fails with MalformedJsonError for invalid JSON', async () => {
      const response = Response.unsafeMake({
        ok: true,
        status: 200,
        statusText: '200 OK',
        type: 'default',
        url: 'https://example.com',
        body: '{invalid json}',
      });

      const exit = await Response.readJsonWithStandardSchemaV1(response, userSchema).pipe(
        Effect.runPromiseExit
      );

      expect(Exit.isFailure(exit)).toBe(true);
      if (Exit.isFailure(exit)) {
        expect(exit.cause._tag).toBe('Fail');
        if (exit.cause._tag === 'Fail') {
          expect(exit.cause.error).toBeInstanceOf(MalformedJsonError);
        }
      }
    });

    test('fails for empty response body', async () => {
      const response = Response.unsafeMake({
        ok: true,
        status: 200,
        statusText: '200 OK',
        type: 'default',
        url: 'https://example.com',
        body: '',
      });

      const exit = await Response.readJsonWithStandardSchemaV1(response, userSchema).pipe(
        Effect.runPromiseExit
      );

      expect(Exit.isFailure(exit)).toBe(true);
      if (Exit.isFailure(exit)) {
        expect(exit.cause._tag).toBe('Fail');
        if (exit.cause._tag === 'Fail') {
          expect(exit.cause.error).toBeInstanceOf(MalformedJsonError);
        }
      }
    });
  });
});
