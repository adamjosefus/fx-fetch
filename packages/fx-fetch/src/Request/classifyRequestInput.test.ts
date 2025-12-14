import { describe, expect, test } from 'vitest';
import { classifyRequestInput } from './classifyRequestInput';
import * as Request from './index';

describe('Request.classifyRequestInput', () => {
  test('Parts', () => {
    const requestParts: Request.Request.Parts = {
      body: 'Hello, world!',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'text/plain',
        'X-Custom-Header': 'CustomValue',
      },
      integrity: 'sha256-abcdef1234567890',
      keepalive: true,
      method: 'post',
      mode: 'no-cors',
      priority: 'high',
      redirect: 'manual',
      referrer: 'https://example.eu',
      referrerPolicy: 'strict-origin-when-cross-origin',
      signal: new AbortController().signal,
      url: 'https://api.example.com/data',
    };

    const result = classifyRequestInput(requestParts);
    const expected = 'parts';

    expect(result.type).toBe(expected);
  });

  test('Request', () => {
    const parts: Request.Request.Parts = {
      body: 'Hello, world!',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'text/plain',
        'X-Custom-Header': 'CustomValue',
      },
      integrity: 'sha256-abcdef1234567890',
      keepalive: true,
      method: 'post',
      mode: 'no-cors',
      priority: 'high',
      redirect: 'manual',
      referrer: 'https://example.eu',
      referrerPolicy: 'strict-origin-when-cross-origin',
      signal: new AbortController().signal,
      url: 'https://api.example.com/data',
    };

    const request = Request.unsafeMake(parts);

    const result = classifyRequestInput(request);
    const expected = 'request';

    expect(result.type).toBe(expected);
  });

  test('Options', () => {
    const requestOptions: Request.Request.Options = {
      url: 'https://api.example.com/data',
      searchParams: {
        query: 'test',
        page: '1',
      },
      init: {
        body: JSON.stringify({ key: 'value' }),
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Custom-Header': 'CustomValue',
        },
        integrity: 'sha256-abcdef1234567890',
        keepalive: true,
        method: 'POST',
        mode: 'no-cors',
        priority: 'high',
        redirect: 'manual',
        referrer: 'https://example.eu',
        referrerPolicy: 'strict-origin-when-cross-origin',
        signal: new AbortController().signal,
      },
    };

    const result = classifyRequestInput(requestOptions);
    const expected = 'options';

    expect(result.type).toBe(expected);
  });

  test('jsRequest', () => {
    const jsRequest = new globalThis.Request('https://api.example.com/data', {
      body: 'Hello, world!',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'text/plain',
        'X-Custom-Header': 'CustomValue',
      },
      integrity: 'sha256-abcdef1234567890',
      keepalive: true,
      method: 'POST',
      mode: 'no-cors',
      priority: 'high',
      redirect: 'manual',
      referrer: 'https://example.eu',
      referrerPolicy: 'strict-origin-when-cross-origin',
      signal: new AbortController().signal,
    });

    const result = classifyRequestInput(jsRequest);
    const expected = 'jsRequest';

    expect(result.type).toBe(expected);
  });
});
