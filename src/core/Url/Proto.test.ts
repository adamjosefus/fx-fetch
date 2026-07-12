import * as util from 'node:util';
import { describe, expect, test } from 'vitest';
import { format } from './format.js';
import { unsafeMake } from './make.js';

const sample = 'https://user:pass@example.com/a/b?x=1#top';

describe('Url Proto (Inspectable)', () => {
  test('toJSON returns the tagged shape with the formatted url', () => {
    const url = unsafeMake(sample);

    expect(url.toJSON()).toEqual({ _id: 'Url', url: format(url) });
  });

  test('toString serializes toJSON (Effect Inspectable convention)', () => {
    const url = unsafeMake(sample);

    expect(url.toString()).toBe(JSON.stringify(url.toJSON()));
    expect(String(url)).toBe(url.toString());
  });

  test('JSON.stringify uses toJSON', () => {
    const url = unsafeMake(sample);

    expect(JSON.parse(JSON.stringify(url))).toEqual({ _id: 'Url', url: format(url) });
  });

  test('NodeInspectSymbol renders without throwing and includes the url', () => {
    const url = unsafeMake(sample);
    const inspected = util.inspect(url);

    expect(inspected).toContain('Url');
    expect(inspected).toContain(format(url));
  });
});
