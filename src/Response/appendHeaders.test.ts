import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Response from './index';

describe('Response.appendHeaders', () => {
  test('dual api', () => {
    const response = Response.unsafeMake({
      status: 200,
      statusText: '200 OK',
      type: 'default',
      url: 'https://example.com',
      body: 'Test body',
      headers: {
        'Content-Type': 'text/plain',
        'X-Existing': 'original',
      },
    });

    const newHeaders = {
      Authorization: 'Bearer token',
      'X-Custom-Header': 'custom-value',
      'Content-Type': 'application/json', // This should append, not replace
    };

    // Data-first form: appendHeaders(response, headers)
    const a = Response.appendHeaders(response, newHeaders);

    // Data-last form: appendHeaders(headers)(response)
    const b = Response.appendHeaders(newHeaders)(response);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
