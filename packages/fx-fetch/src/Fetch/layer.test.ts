import { Effect, Exit, Layer } from 'effect';
import { describe, expect, expectTypeOf, test } from 'vitest';
import { Fetch } from './Fetch';
import { layer } from './layer';

describe('Fetch.layer', () => {
  test('provides Fetch service', async () => {
    const program = Effect.gen(function* () {
      const fetch = yield* Fetch;
      return fetch;
    });

    const result = await program.pipe(Effect.provide(layer), Effect.runPromiseExit);

    expect(Exit.isSuccess(result)).toBe(true);
  });

  test('layer type', () => {
    expectTypeOf(layer).toEqualTypeOf<Layer.Layer<Fetch>>();
  });
});
