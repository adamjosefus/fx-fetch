import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Response from '.';

describe('Response.unsafeMake', () => {
  test('makeFromParts', () => {
    const parts: Required<Response.Response.Parts> = {
      headers: new Map([['content-type', 'application/json']]),
      status: 200,
      statusText: '200 OK',
      url: 'https://example.com',
      redirected: false,
      body: `{"name":"John","age":30}`,
      type: 'cors',
    };

    const response = Response.unsafeMake({
      ok: true,
      status: 200,
      headers: new Headers({
        'content-type': 'application/json',
      }),
      statusText: '200 OK',
      url: 'https://example.com',
      body: `{"name":"John","age":30}`,
      type: 'cors',
    });

    const a = response;
    const b = Response.unsafeMake(parts);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });

  test('makeFromOptions', () => {
    const options: Required<Response.Response.Options> = {
      body: `{"name":"John","age":30}`,
      init: {
        headers: new Headers({
          'content-type': 'application/json',
        }),
        status: 200,
        statusText: '200 OK',
      },
    };

    const response = Response.unsafeMake({
      ok: true,
      status: 200,
      headers: new Headers({
        'content-type': 'application/json',
      }),
      statusText: '200 OK',
      url: '', // We cannot define the URL via `globalThis.ResponseInit`
      body: `{"name":"John","age":30}`,
    });

    const a = response;
    const b = Response.unsafeMake(options);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });

  test('makeFromJsResponse', () => {
    const bodyInit = `{"name":"John","age":30}`;
    const responseInit = {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
      statusText: '200 OK',
    };

    const jsResponse = new globalThis.Response(bodyInit, responseInit);

    const response = Response.unsafeMake({
      ok: true,
      status: 200,
      headers: new Headers({
        'content-type': 'application/json',
      }),
      statusText: '200 OK',
      url: '', // We cannot define the URL via `globalThis.ResponseInit`
      body: `{"name":"John","age":30}`,
    });

    const a = response;
    const b = Response.unsafeMake(jsResponse);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
