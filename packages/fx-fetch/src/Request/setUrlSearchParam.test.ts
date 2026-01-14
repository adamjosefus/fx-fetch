import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Url from '../Url/index';
import * as Request from './index';

describe('Request.setUrlSearchParam', () => {
  test('Request.setUrlSearchParam', () => {
    const urlString = Request.unsafeMake({ url: 'https://example.com' }).pipe(
      Request.setUrlSearchParam('page', '1'),
      Request.setUrlSearchParam('limit', 20),
      Request.setUrlSearchParam('limit2', 10),
      Request.setUrlSearchParam('filter', ['active', 'new']),
      Request.setUrlSearchParam('empty', ''),
      Request.setUrlSearchParam('limit2', undefined),
      Request.getUrl,
      Url.format
    );

    expect(urlString).toBe('https://example.com?page=1&limit=20&filter=active&filter=new&empty=');
  });

  test('dual api', () => {
    const request = Request.unsafeMake({ url: 'https://example.com' });

    // Data-first form: setUrlSearchParam(request, key, value)
    const a = Request.setUrlSearchParam(request, 'page', '1');

    // Data-last form: setUrlSearchParam(key, value)(request)
    const b = Request.setUrlSearchParam('page', '1')(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
