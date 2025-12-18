---
title: Request
group: Docs
---

# Request Module

> [!NOTE]
> Documentation is a work in progress. Please excuse any inconsistencies or missing information.

```ts
// You can make a Request from any of Request.Request.Input

const parts: Request.Request.Parts = {
  body: 'Hello, world!',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'text/plain',
  },
  integrity: 'sha256-abcdef',
  keepalive: true,
  method: 'POST',
  mode: 'cors',
  priority: 'high',
  redirect: 'follow',
  referrer: 'https://example.com',
  referrerPolicy: 'no-referrer',
  signal: new AbortController().signal,
  url: 'https://example.com/api',
};

Request.make(parts);
```