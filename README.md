[<img src="https://img.shields.io/npm/v/fx-fetch">](https://npmjs.com/package/fx-fetch)

<img style="margin-bottom: 2em;" width="128" src="https://raw.githubusercontent.com/adamjosefus/fx-fetch/main/packages/website/public/logo_fx-fetch.svg" alt="fx-fetch logo">

# `fx-fetch` — Fetch with [EffectTS](https://effect.website/)

> Simple, immutable, clonable, and effect-based HTTP fetching.

## Introduction

A production-ready solution for safe & simple HTTP fetching built with
[EffectTS](https://effect.website/). **Designed with great developer
experience in mind.**

Works everywhere! _Even in [Firefox 🦊](./packages/website/firefox-request-clone-bug.js)._

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Comparison](#comparison-with-other-solutions)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)
- [Sponsorship](#sponsorship)

## Features

✅ **Production-ready** — Used in production by [Ematiq](https://www.ematiq.com) since February 2025<br>
✅ **Immutable & Clonable** — Follows functional programming principles<br>
✅ **Safe by default** — Prevents common pitfalls with HTTP fetching<br>
✅ **Cross-platform** — Works in all modern browsers, Bun, Deno, and Node.js<br>
✅ **Effect-based** — Seamless integration with the Effect ecosystem<br>
✅ **Testable** — Easy mocking and testing with service-based architecture<br>
✅ **Dual API** — Familiar syntax from [EffectTS](https://effect.website/docs/code-style/dual)<br>

## Installation

```bash
npm i fx-fetch # or pnpm, bun
```

## Quick Start

```ts
import { Effect, Schema } from "effect";
import { Fetch, Request } from "fx-fetch";

class User extends Schema.Class<User>("User")({
  id: Schema.Int,
  firstName: Schema.String,
  lastName: Schema.String,
}) {}

//     ┌─ Effect.Effect<
//     │    User,
//     │    | Fetch.AbortError
//     │    | Fetch.FetchError
//     │    | Fetch.NotAllowedError
//     │    | Response.NotOkError
//     │    | MalformedJsonError
//     │    | ParseError,
//     │    Fetch.Fetch
//     │  >
//     ▼
const getUser = Effect.fn(function* (id: number) {
  const req = Request.unsafeMake({ url: `https://dummyjson.com/users/${id}` });
  const payload = yield* Fetch.fetchJsonWithSchema(req, User);

  // User ╶─┐
  //        ▼
  return payload;
});

await getUser(1).pipe(
  Effect.catchTags({ /* Handle errors here */ }),
  Effect.ensureErrorType<never>(),
  // Provide the Fetch implementation as a service.
  // Useful for testing/mocking.
  Effect.provideService(Fetch.Fetch, Fetch.FetchLive),
  Effect.runPromise,
);
```

## Documentation

📚 See our [documentation site](https://adamjosefus.github.io/fx-fetch) for
detailed guides and API reference.

## Comparison with Other Solutions

| Solution                                                                                                            | Immutable | Clonable | Effect-based | Production-ready |
| ------------------------------------------------------------------------------------------------------------------- | :-------: | :------: | :----------: | :--------------: |
| `window.fetch` [↗](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)                                      |     ❌     |    ❌¹    |      ❌       |        ✅         |
| `effect-fetch` [↗](https://www.npmjs.com/package/effect-fetch)                                                      |     ✅     |    ❌     |      ✅       |        🤷‍♂️         |
| `@effect/platform` Http API [↗](https://github.com/Effect-TS/effect/blob/main/packages/platform/README.md#http-api) |     ✅     |    ✅     |      ✅       |        ❌²        |
| **`fx-fetch`**                                                                                                      |     ✅     |    ✅     |      ✅       |        ✅         |

---

1. `globalThis.Request` and `globalThis.Response` are not truly clonable. [Why?](./packages/website/firefox-request-clone-bug.js)
2. Marked as unstable in the official documentation. Some method implementations
   are still missing.

## FAQ

### Is it really production-ready?

**Yes!** We ([Ematiq](https://www.ematiq.com)) have been using it in production
since early February 2025.

### Why are immutability and clonability important?

EffectTS is built on functional programming principles. All building blocks are
immutable and clonable by design. For a library to truly be in symbiosis
with EffectTS, it must adhere to the same principles.

Working with immutable objects can be challenging without proper tools — that's
why we built `fx-fetch`.

EffectTS excels at parallel actions and concurrent
[fibers](https://effect.website/docs/concurrency/fibers/). Without relying on
immutable and clonable structures, you may encounter unexpected issues.

**Real-world examples:**

- Reusing the same `Request` for paginated API calls
- Appending general headers to already-created `Request` objects
- Retrying failed requests without worrying about side effects

### Why aren't [`Request.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [`Response.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Response) enough?

> [!CAUTION]
> First, they don't work properly in some browsers (looking at you, [Firefox 🦊](./packages/website/firefox-request-clone-bug.js)).

Even when they work correctly, they don't solve DX issues or provide key
features like reading request/response properties multiple times without side
effects.

```ts
const req = new globalThis.Request("url", {
  method: "POST",
  body: "Hello World", // ← String
});

// ReadableStream can only be read once. You must know what you're reading.
console.log(req.body); // → `ReadableStream { }`
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Feel free to ask questions or suggest features and improvements by opening an issue.

## License

This project is licensed under the terms of the [MIT license](./LICENSE).

## Sponsorship

### OG Sponsor

The `fx-fetch` library was originally designed for TypeScript colleagues at Ematiq. Thanks to them for testing and feedback on early versions!

<table>
  <tr>
    <th>
    <a target="_blank" href="https://www.ematiq.com/">Ematiq</a>
    </th>
  </tr>
  <tr>
    <td>
      <img width="128" src="https://raw.githubusercontent.com/adamjosefus/fx-fetch/main/packages/website/public/logo_ematiq.svg">
    </td>
  </tr>
</table>
