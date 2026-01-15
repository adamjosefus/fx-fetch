import { Effect, Exit, Schema } from 'effect';
import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from '.';

describe('Request.readJsonWithSchema', () => {
  const request = Request.unsafeMake({
    url: 'https://example.com',
    body: `{"name":"John","age":30}`,
  });

  const schema = Schema.Struct({
    name: Schema.String,
    age: Schema.Int,
  });

  test('dualApi', async () => {
    const a = await Request.readJsonWithSchema(request, schema).pipe(Effect.runPromiseExit);
    const b = await Request.readJsonWithSchema(schema)(request).pipe(Effect.runPromiseExit);

    const expectedParsedValue = { name: 'John', age: 30 };

    expect(a).toEqual(b);
    expect(a).toEqual(Exit.succeed(expectedParsedValue));
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
