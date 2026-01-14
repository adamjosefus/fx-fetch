import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from './index';

describe('Request.deleteHeader', () => {
  test('dual api without value (deletes all)', () => {
    const headerName = 'Authorization';
    const request = Request.unsafeMake({
      url: 'https://example.com',
      headers: { [headerName]: 'Bearer token' },
    });

    // Data-first form: deleteHeader(request, name)
    const a = Request.deleteHeader(request, headerName);

    // Data-last form: deleteHeader(name)(request)
    const b = Request.deleteHeader(headerName)(request);

    expect(a).toEqual(b);
    expect(a.headers).toEqual(new Map());
    expectTypeOf(a).toEqualTypeOf(b);
  });

  test('dual api with value (deletes specific)', () => {
    const headerName = 'X-Custom-Header';
    const request = Request.unsafeMake({
      url: 'https://example.com',
      headers: [[headerName, ['Value1', 'Value2']]],
    });

    // Data-first form: deleteHeader(request, name)
    const a = Request.deleteHeader(request, headerName, 'Value1');

    // Data-last form: deleteHeader(name)(request)
    const b = Request.deleteHeader(headerName, 'Value1')(request);

    expect(a).toEqual(b);
    expect(a.headers).toEqual(new Map([['x-custom-header', ['Value2']]]));
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
