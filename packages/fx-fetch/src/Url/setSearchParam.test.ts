import { describe, expect, test } from 'vitest';
import * as Url from './index';

describe('Url.setSearchParam', () => {
  test('Parts', () => {
    const url = Url.unsafeMake('https://example.com').pipe(
      Url.setSearchParam('key1', 'value1'),
      Url.setSearchParam('key2', 'value2'),
      Url.setSearchParam('key3', 'value3'),
      Url.setSearchParam('key4', 123),
      Url.setSearchParam('key1', 'newValue1'),
      Url.setSearchParam('key2', undefined)
    );

    expect(Url.format(url)).toBe('https://example.com?key1=newValue1&key3=value3&key4=123');
  });
});
