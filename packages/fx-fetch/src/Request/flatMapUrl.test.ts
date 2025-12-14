import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Url from '../Url';
import * as Request from './index';

describe('Request.flatMapUrl', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({
      url: 'https://api.example.com',
      method: 'GET',
    });

    const mapperFn = (url: Url.Url) => {
      const jsUrl = Url.toJsUrl(url);
      return Request.unsafeMake({
        url: `${jsUrl.toString()}/users`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    // Data-first form: flatMapUrl(request, mapperFn)
    const a = Request.flatMapUrl(request, mapperFn);

    // Data-last form: flatMapUrl(mapperFn)(request)
    const b = Request.flatMapUrl(mapperFn)(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
