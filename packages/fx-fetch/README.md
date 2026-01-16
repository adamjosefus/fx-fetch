<!-- This is just a copy of ../../README.md. This is temp solution -->

[<img src="https://img.shields.io/npm/v/fx-fetch">](https://npmjs.com/package/fx-fetch)

<img style="margin-bottom: 2em;" width="128" src="https://raw.githubusercontent.com/adamjosefus/fx-fetch/main/packages/website/public/logo_fx-fetch.svg" alt="fx-fetch logo">

# **Fx-Fetch** = Fetch × [EffectTS](https://effect.website/)

> Simple, immutable, clonable, and effect-based HTTP fetching.

## Introduction

A production-ready solution for safe & simple HTTP fetching built with
[EffectTS](https://effect.website/). **Designed with great developer
experience in mind.**
<br>Works everywhere! _Even in [Firefox 🦊]([./packages/website/firefox-request-clone-bug.js](https://github.com/adamjosefus/fx-fetch/blob/42/better-readme/packages/website/firefox-request-clone-bug.js))._

- ✅ **Production-ready** — Used in production by [Ematiq](https://www.ematiq.com) since February 2025
- ✅ **Immutable & Clonable** — Follows functional programming principles
- ✅ **Safe by default** — Prevents common pitfalls with HTTP fetching
- ✅ **Cross-platform** — Works in all modern browsers, Bun, Deno, and Node.js
- ✅ **Effect-based** — Seamless integration with the Effect ecosystem
- ✅ **Testable** — Easy mocking and testing with service-based architecture
- ✅ **Dual API** — Familiar syntax from [EffectTS](https://effect.website/docs/code-style/dual)
- ✅ **Simple** — It is just fetch! No more complex concepts to learn.


## Documentation

📚 See our rich [documentation site](https://adamjosefus.github.io/fx-fetch). It's worth it!


## Installation

```bash
npm i fx-fetch # or pnpm, bun, deno
```

## Quick Example

```ts
import { Effect, Schema } from "effect";
import { Fetch, Request } from "fx-fetch";

class User extends Schema.Class<User>("User")({
  id: Schema.Int,
  firstName: Schema.String,
  lastName: Schema.String,
}) {}

const getUser = Effect.fn(function* (id: number) {
  const request = Request.unsafeMake({ url: `https://dummyjson.com/users/${id}` });
  const payload = yield* Fetch.fetchJsonWithSchema(request, User);

  // User ╶─┐
  //        ▼
  return payload;
});
```

## Comparison with Other Solutions

| Solution                                                                                                            | Immutable | Clonable | Effect-based | Production-ready |
| ------------------------------------------------------------------------------------------------------------------- | :-------: | :------: | :----------: | :--------------: |
| `window.fetch` [↗](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)                                      |     ❌     |    ❌¹    |      ❌       |        ✅         |
| `@effect/platform` Http API [↗](https://github.com/Effect-TS/effect/blob/main/packages/platform/README.md#http-api) |     ✅     |    ✅     |      ✅       |        ❌²        |
| **`fx-fetch`**                                                                                                      |     ✅     |    ✅     |      ✅       |        ✅         |

---

1. `globalThis.Request` and `globalThis.Response` are not truly clonable. [Why?]([./packages/website/firefox-request-clone-bug.js](https://github.com/adamjosefus/fx-fetch/blob/42/better-readme/packages/website/firefox-request-clone-bug.js))
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
> First, they don't work properly in some browsers (looking at you, [Firefox 🦊]([./packages/website/firefox-request-clone-bug.js](https://github.com/adamjosefus/fx-fetch/blob/42/better-readme/packages/website/firefox-request-clone-bug.js))).

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
