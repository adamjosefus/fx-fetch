import { Chunk, Effect, Layer, Stream } from 'effect';
import { describe, expectTypeOf, test } from 'vitest';
import * as Request from '../Request';
import * as Response from '../Response';
import * as Fetch from '.';

function _collectUint8ArrayStream(
  stream: Stream.Stream<Uint8Array<ArrayBufferLike>, Error, never>
): Promise<Uint8Array<ArrayBufferLike>> {
  return Stream.runCollect(stream).pipe(
    Effect.map((chunk) => {
      const parts = Chunk.toReadonlyArray(chunk);
      const totalLength = parts.reduce((sum, p) => sum + p.length, 0);
      const out = new Uint8Array(totalLength);
      let offset = 0;
      for (const part of parts) {
        out.set(part, offset);
        offset += part.length;
      }
      return out;
    }),
    Effect.runPromise
  );
}

describe('Fetch.fetchStream', () => {
  const request = Request.unsafeMake({ url: 'https://example.com' });

  const options = {
    onError: (error: unknown) => new Error('Stream error', { cause: error }),
  };

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

  const _mockLayer = Layer.succeed(Fetch.Fetch, mockFetch);

  test('dualApi', () => {
    const aStream = Fetch.fetchStream(request, options);
    const bStream = Fetch.fetchStream(options)(request);

    // Streams are not directly comparable, only verify types match
    expectTypeOf(aStream).toEqualTypeOf(bStream);
  });

  test('dualApi with optional releaseLockOnEnd', () => {
    const optionsWithRelease = {
      onError: (error: unknown) => new Error('Stream error', { cause: error }),
      releaseLockOnEnd: true,
    };

    const aStream = Fetch.fetchStream(request, optionsWithRelease);
    const bStream = Fetch.fetchStream(optionsWithRelease)(request);

    // Streams are not directly comparable, only verify types match
    expectTypeOf(aStream).toEqualTypeOf(bStream);
  });
});
