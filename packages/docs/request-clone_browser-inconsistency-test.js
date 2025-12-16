// This code demonstrates the behavior of the Request.clone() method across different JavaScript environments.
// You can copy-paste and run this code in various environments to observe the differences.

// https://bugzilla.mozilla.org/show_bug.cgi?id=1911164

// Bun: 1.3.4
// Deno: 2.5.6
// Firefox: 146.0
// Chromium: 143
// NodeJs: 24.10.0
// Safari: 26.1

(async () => {
  const req1 = new Request('https://example.com', {
    method: 'POST',
    body: JSON.stringify({ hello: 'world' }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const req2 = req1.clone();

  console.log('Are requests equal?', req1 === req2, '(should be false)');
  /*
  ┌──────────┬───────┐
  │ Browser  │ >.    │
  ├──────────┼───────┤
  │ Bun      │ false │
  │ Deno     │ false │
  │ Firefox  │ false │
  │ Chromium │ false │
  │ NodeJS   │ false │
  │ Safari   │ false │
  └──────────┴───────┘
  */

  console.log('Are bodies equal?', req1.body === req2.body, '(should be false)');
  /*
  ┌──────────┬───────┐
  │ Browser  │ >.    │
  ├──────────┼───────┤
  │ Bun      │ false │
  │ Deno     │ false │
  │ Firefox  │ true  │ ← 👀
  │ Chromium │ false │
  │ NodeJS   │ false │
  │ Safari   │ false │
  └──────────┴───────┘
   */

  // Reading the body of one request
  await req1.body
    ?.getReader()
    .read()
    .then(({ done }) => {
      if (done) {
        console.log('req1 body has been fully read.');
      }
    });

  console.log('Is req1 body used?', req1.bodyUsed, '(should be true)');
  console.log('Is req2 body used?', req2.bodyUsed, '(should be false)');
  /*
  ┌──────────┬───────┬───────┐
  │ Browser  │ >. 1  │ >. 2  │
  ├──────────┼───────┼───────┤
  │ Bun      │ true  │ false │
  │ Deno     │ true  │ false │
  │ Firefox  │ false │ false │ ← 👀
  │ Chromium │ true  │ false │
  │ NodeJS   │ true  │ false │
  │ Safari   │ true  │ false │
  └──────────┴───────┴───────┘
  */
})();
