import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Url from '../Url';
import * as Request from './index';

describe('Request.mapUrl', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({
      url: 'https://api.example.com/v1',
      method: 'GET',
    });

    const mapperFn = (url: Url.Url) => {
      // Add /users path to the URL
      const jsUrl = Url.toJsUrl(url);
      return Url.unsafeMake(`${jsUrl.toString()}/users`);
    };

    // Data-first form: mapUrl(request, mapperFn)
    const a = Request.mapUrl(request, mapperFn);

    // Data-last form: mapUrl(mapperFn)(request)
    const b = Request.mapUrl(mapperFn)(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);

    // Verify the URL was transformed
    const urlA = Request.getUrl(a);
    const jsUrlA = Url.toJsUrl(urlA);
    expect(jsUrlA.pathname).toBe('/v1/users');
  });
});
