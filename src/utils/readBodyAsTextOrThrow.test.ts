import { describe, expect, expectTypeOf, test } from 'vitest';
import { BodyIsNotPresentError } from '../Cause';
import { normalizeAndCloneBody } from './normalizeAndCloneBody';
import { readBodyAsTextOrThrow } from './readBodyAsTextOrThrow';

describe('readBodyAsTextOrThrow', () => {
  test('valid', async () => {
    const bodyText = 'Hello, world!';

    const normalizedBody = normalizeAndCloneBody(bodyText);
    const outputText = await readBodyAsTextOrThrow(normalizedBody);

    expect(outputText).toBe(bodyText);
    expectTypeOf(outputText).toBeString();
  });

  test('missing', async () => {
    await expect(readBodyAsTextOrThrow(undefined)).rejects.toThrowError(
      new BodyIsNotPresentError({ message: 'Body is not present' })
    );
  });
});
