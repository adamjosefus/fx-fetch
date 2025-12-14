import { Effect, Schema } from 'effect';
import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Response from '.';

describe('Response.readJsonWithSchema', () => {
  const response = Response.unsafeMake({
    ok: true,
    status: 200,
    statusText: '200 OK',
    type: 'default',
    url: 'https://example.com',
    body: `{"name":"John","age":30}`,
  });

  const schema = Schema.Struct({
    name: Schema.String,
    age: Schema.Int,
  });

  test('dualApi', async () => {
    const a = await Response.readJsonWithSchema(response, schema).pipe(Effect.runPromiseExit);
    const b = await Response.readJsonWithSchema(schema)(response).pipe(Effect.runPromiseExit);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
