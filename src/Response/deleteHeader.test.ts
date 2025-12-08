import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Response from './index';

describe('Response.deleteHeader', () => {
  test('dual api', () => {
    const response = Response.unsafeMake({
      status: 200,
      statusText: '200 OK',
      type: 'default',
      url: 'https://example.com',
      body: 'Test body',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
        'X-Custom-Header': 'value',
      },
    });

    const headerName = 'Authorization';

    // Data-first form: deleteHeader(response, headerName)
    const a = Response.deleteHeader(response, headerName);

    // Data-last form: deleteHeader(headerName)(response)
    const b = Response.deleteHeader(headerName)(response);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
