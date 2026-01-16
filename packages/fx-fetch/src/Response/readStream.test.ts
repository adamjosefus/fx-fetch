import { Chunk, Effect, Stream } from 'effect';
import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Response from '.';

function collectUint8ArrayStream(
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

describe('Response.readStream', () => {
  const response = Response.unsafeMake({
    ok: true,
    status: 200,
    statusText: '200 OK',
    type: 'default',
    url: 'https://example.com',
    body: `{"name":"John","age":30}`,
  });

  const options = {
    onError: (error: unknown) => new Error('Stream error', { cause: error }),
  };

  test('dualApi', async () => {
    const aStream = await Response.readStream(response, options);
    const bStream = await Response.readStream(options)(response);

    const aExit = await aStream.pipe(Effect.map(collectUint8ArrayStream), Effect.runPromiseExit);
    const bExit = await bStream.pipe(Effect.map(collectUint8ArrayStream), Effect.runPromiseExit);

    expect(aExit).toEqual(bExit);
    expectTypeOf(aStream).toEqualTypeOf(bStream);
  });

  test('dualApi with optional releaseLockOnEnd', async () => {
    const optionsWithRelease = {
      onError: (error: unknown) => new Error('Stream error', { cause: error }),
      releaseLockOnEnd: true,
    };

    const aStream = await Response.readStream(response, optionsWithRelease);
    const bStream = await Response.readStream(optionsWithRelease)(response);

    const aExit = await aStream.pipe(Effect.map(collectUint8ArrayStream), Effect.runPromiseExit);
    const bExit = await bStream.pipe(Effect.map(collectUint8ArrayStream), Effect.runPromiseExit);

    expect(aExit).toEqual(bExit);
    expectTypeOf(aStream).toEqualTypeOf(bStream);
  });
});
