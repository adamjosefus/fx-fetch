import { Chunk, Effect, Stream } from 'effect';
import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from '.';

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

describe('Request.readStream', () => {
  const request = Request.unsafeMake({
    url: 'https://example.com',
    body: `{"name":"John","age":30}`,
  });

  const options = {
    onError: (error: unknown) => new Error('Stream error', { cause: error }),
  };

  test('dualApi', async () => {
    const aStream = await Request.readStream(request, options);
    const bStream = await Request.readStream(options)(request);

    const aExit = await aStream.pipe(
      Effect.flatMap((stream) => Effect.promise(() => collectUint8ArrayStream(stream))),
      Effect.runPromiseExit
    );
    const bExit = await bStream.pipe(
      Effect.flatMap((stream) => Effect.promise(() => collectUint8ArrayStream(stream))),
      Effect.runPromiseExit
    );

    expect(aExit).toEqual(bExit);
    expectTypeOf(aStream).toEqualTypeOf(bStream);
  });

  test('dualApi with optional releaseLockOnEnd', async () => {
    const optionsWithRelease = {
      onError: (error: unknown) => new Error('Stream error', { cause: error }),
      releaseLockOnEnd: true,
    };

    const aStream = await Request.readStream(request, optionsWithRelease);
    const bStream = await Request.readStream(optionsWithRelease)(request);

    const aExit = await aStream.pipe(
      Effect.flatMap((stream) => Effect.promise(() => collectUint8ArrayStream(stream))),
      Effect.runPromiseExit
    );
    const bExit = await bStream.pipe(
      Effect.flatMap((stream) => Effect.promise(() => collectUint8ArrayStream(stream))),
      Effect.runPromiseExit
    );

    expect(aExit).toEqual(bExit);
    expectTypeOf(aStream).toEqualTypeOf(bStream);
  });
});
