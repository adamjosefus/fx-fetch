import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Response from './index';

describe('Response.setHeaders', () => {
  test('dual api', () => {
    const response = Response.unsafeMake({
      status: 200,
      statusText: '200 OK',
      type: 'default',
      url: 'https://example.com',
      body: 'Test body',
    });
    const headers = {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'value',
    };

    // Data-first form: setHeaders(response, headers)
    const a = Response.setHeaders(response, headers);

    // Data-last form: setHeaders(headers)(response)
    const b = Response.setHeaders(headers)(response);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
