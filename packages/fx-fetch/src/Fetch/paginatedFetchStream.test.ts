import { Effect, Layer, Option, Schema } from 'effect';
import { describe, expectTypeOf, test } from 'vitest';
import * as Request from '../Request';
import * as Response from '../Response';
import * as Fetch from '.';

describe('Fetch.paginatedFetchStream', () => {
  const request = Request.unsafeMake({ url: 'https://example.com' });

  const ItemSchema = Schema.Struct({
    id: Schema.Int,
    name: Schema.String,
  });

  const PayloadSchema = Schema.Struct({
    nextToken: Schema.String.pipe(Schema.optional),
    items: Schema.Array(ItemSchema),
  });

  const onResponse = Effect.fn(function* (lastResponse: Response.Response) {
    const payload = yield* Response.readJsonWithSchema(lastResponse, PayloadSchema);

    const nextToken = Option.fromNullable(payload.nextToken);
    const nextRequest = nextToken.pipe(
      Option.map((token) => Request.setUrlSearchParam(request, 'token', token))
    );

    return {
      pageEmission: payload.items,
      nextRequest,
    };
  });

  const mockFetch = Fetch.Fetch.of((_req: Request.Request) =>
    Effect.succeed(
      Response.unsafeMake({
        ok: true,
        status: 200,
        statusText: '200 OK',
        type: 'default',
        url: 'https://example.com',
        body: `{"items":[{"id":1,"name":"John"}]}`,
      })
    )
  );

  const _mockLayer = Layer.succeed(Fetch.Fetch, mockFetch);

  test('dualApi', () => {
    const a = Fetch.paginatedFetchStream(request, onResponse);
    const b = Fetch.paginatedFetchStream(onResponse)(request);

    // Streams are not directly comparable, only verify types match
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
