import { Effect, Layer, Schema } from 'effect';
import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from '../Request';
import * as Response from '../Response';
import * as Fetch from '.';

describe('Fetch.fetchJsonWithSchema', () => {
  const request = Request.unsafeMake({ url: 'https://example.com' });

  const schema = Schema.Struct({
    name: Schema.String,
    age: Schema.Int,
  });

  const mockFetch = Fetch.Fetch.of((_req: Request.Request) =>
    Effect.succeed(
      Response.unsafeMake({
        ok: true,
        status: 200,
        statusText: '200 OK',
        type: 'default',
        url: 'https://example.com',
        body: `{"name":"John","age":30}`,
      })
    )
  );

  const mockLayer = Layer.succeed(Fetch.Fetch, mockFetch);

  test('dualApi', async () => {
    const a = await Fetch.fetchJsonWithSchema(request, schema).pipe(
      Effect.provide(mockLayer),
      Effect.runPromiseExit
    );
    const b = await Fetch.fetchJsonWithSchema(schema)(request).pipe(
      Effect.provide(mockLayer),
      Effect.runPromiseExit
    );

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
