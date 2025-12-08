import { describe, expect, test } from 'vitest';
import * as Response from './index';

describe('Response.isOk', () => {
  test('returns true for 200 status', () => {
    const response = Response.unsafeMake({
      status: 200,
      statusText: '200 OK',
      type: 'default',
      url: 'https://example.com',
      body: 'Test body',
    });

    expect(Response.isOk(response)).toBe(true);
  });

  test('returns false for 404 status', () => {
    const response = Response.unsafeMake({
      status: 404,
      statusText: '404 Not Found',
      type: 'default',
      url: 'https://example.com',
      body: 'Not found',
    });

    expect(Response.isOk(response)).toBe(false);
  });
});
