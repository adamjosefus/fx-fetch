import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from './index';

describe('Request.addSignal', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({ url: 'https://example.com' });
    const controller = new AbortController();
    const signal = controller.signal;

    // Data-first form: addSignal(request, signal)
    const a = Request.addSignal(request, signal);

    // Data-last form: addSignal(signal)(request)
    const b = Request.addSignal(signal)(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
