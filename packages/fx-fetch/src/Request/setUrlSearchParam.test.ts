import { expect, test } from 'vitest';
import * as Url from '../Url/index';
import * as Request from './index';

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
