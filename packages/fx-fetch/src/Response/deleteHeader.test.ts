import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Response from './index';

describe('Response.deleteHeader', () => {
  test('dual api with optional value', () => {
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
    expect(a.headers).toEqual(
      new Map([
        ['content-type', ['application/json']],
        ['x-custom-header', ['value']],
      ])
    );
    expectTypeOf(a).toEqualTypeOf(b);
  });

  test('dual api without optional value', () => {
    const response = Response.unsafeMake({
      status: 200,
      statusText: '200 OK',
      type: 'default',
      url: 'https://example.com',
      body: 'Test body',
      headers: [['X-Custom-Header', ['Value1', 'Value2']]],
    });

    const headerName = 'X-Custom-Header';

    // Data-first form: deleteHeader(response, name, value)
    const a = Response.deleteHeader(response, headerName, 'Value1');

    // Data-last form: deleteHeader(name, value)(response)
    const b = Response.deleteHeader(headerName, 'Value1')(response);

    expect(a).toEqual(b);
    expect(a.headers).toEqual(new Map([['x-custom-header', ['Value2']]]));
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
