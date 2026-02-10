## 1.1.2 (2026-02-10)

### 🚀 Features

- **Fetch:** Implement Fetch layer ([7f75221](https://github.com/adamjosefus/fx-fetch/commit/7f75221))
- **Fetch:** Extract the core fetch execution as internal logic and refactor FetchLive to use it. ([4288538](https://github.com/adamjosefus/fx-fetch/commit/4288538))
- **Fetch:** Add `makeMockLayer` for creating mock Fetch layers in tests ([2550f2b](https://github.com/adamjosefus/fx-fetch/commit/2550f2b))
- **Fetch:** Implement `makeMiddlewareLayer` for customizable request and response handling ([553e6ef](https://github.com/adamjosefus/fx-fetch/commit/553e6ef))

### 📐 Refactor

- **Fetch:** Refactor Fetch service response types and update example usage ([7074f19](https://github.com/adamjosefus/fx-fetch/commit/7074f19))
- **Request:** Enhance the Request API to accept string inputs for better DX. ([4bd502e](https://github.com/adamjosefus/fx-fetch/commit/4bd502e))

### ❤️ Thank You

- Adam Josefus @adamjosefus

## 1.1.2-beta.0 (2026-01-27)

### 🚀 Features

- **Fetch:** Implement Fetch layer ([7f75221](https://github.com/adamjosefus/fx-fetch/commit/7f75221))
- **Fetch:** Extract the core fetch execution as internal logic and refactor FetchLive to use it. ([4288538](https://github.com/adamjosefus/fx-fetch/commit/4288538))
- **Fetch:** Add `makeMockLayer` for creating mock Fetch layers in tests ([2550f2b](https://github.com/adamjosefus/fx-fetch/commit/2550f2b))
- **Fetch:** Implement `makeMiddlewareLayer` for customizable request and response handling ([553e6ef](https://github.com/adamjosefus/fx-fetch/commit/553e6ef))

### 📐 Refactor

- **Fetch:** Refactor Fetch service response types and update example usage ([7074f19](https://github.com/adamjosefus/fx-fetch/commit/7074f19))
- **Request:** Enhance the Request API to accept string inputs for better DX. ([4bd502e](https://github.com/adamjosefus/fx-fetch/commit/4bd502e))

### ❤️ Thank You

- Adam Josefus @adamjosefus

## 1.1.1 (2026-01-16)

### 🩹 Fixes

- Fix circular dependencies ([caaa98a](https://github.com/adamjosefus/fx-fetch/commit/caaa98a))

### ❤️ Thank You

- Adam Josefus @adamjosefus

## 1.1.0 (2026-01-15)

### 🚀 Features

- Implement `readJsonWithStandardSchemaV1` function for JSON response validation with [Standard Schema](https://standardschema.dev/schema) ([5468cb0](https://github.com/adamjosefus/fx-fetch/commit/5468cb0))
- Add `notOkEither` function to encapsulate `Response` and `NotOkError` in Either type ([8588a8e](https://github.com/adamjosefus/fx-fetch/commit/8588a8e))

### 🩹 Fixes

- Update dual function to validate request type in `deleteHeader` ([a345190](https://github.com/adamjosefus/fx-fetch/commit/a345190))
- Update dual function to validate response type in `deleteHeader` ([57c4e66](https://github.com/adamjosefus/fx-fetch/commit/57c4e66))
- Update dual function to validate url type in `deleteSearchParam` ([0a4e4f1](https://github.com/adamjosefus/fx-fetch/commit/0a4e4f1))

### 📐 Refactor

- Make tsconfig dom agnostic ([a596483](https://github.com/adamjosefus/fx-fetch/commit/a596483))

### 🧪 Tests

- Add unit tests for `readJsonWithStandardSchemaV1` function ([ce0f0e8](https://github.com/adamjosefus/fx-fetch/commit/ce0f0e8))
- Add unit tests for `Response.notOkEither` function ([8598fa8](https://github.com/adamjosefus/fx-fetch/commit/8598fa8))
- Add unit tests for dual api cases ([a1044fb](https://github.com/adamjosefus/fx-fetch/commit/a1044fb))

### ❤️ Thank You

- Adam Josefus @adamjosefus

## 1.0.5-beta.0 (2026-01-10)

### 📐 Refactor

- Make tsconfig dom agnostic ([7138fc6](https://github.com/adamjosefus/fx-fetch/commit/7138fc6))

### ❤️ Thank You

- Adam Josefus @adamjosefus

## 1.0.4 (2026-01-08)

### 🩹 Fixes

- Correct TaggedError tag for MalformedReadableStreamError ([de78128](https://github.com/adamjosefus/fx-fetch/commit/de78128))
- Throw RuntimeException for unknown fetch errors ([0913ecc](https://github.com/adamjosefus/fx-fetch/commit/0913ecc))
- Update example in toJsHeaders documentation for clarity and consistency ([0f0e467](https://github.com/adamjosefus/fx-fetch/commit/0f0e467))

### 📐 Refactor

- Improve tree shaking ability ([8407731](https://github.com/adamjosefus/fx-fetch/commit/8407731))
- Use verbatimModuleSyntax ([2a3ca15](https://github.com/adamjosefus/fx-fetch/commit/2a3ca15))
- Simplify tsconfig.json for better module handling ([bd9d487](https://github.com/adamjosefus/fx-fetch/commit/bd9d487))
- Add missing toParts function to convert Request to its constituent parts ([cc9b330](https://github.com/adamjosefus/fx-fetch/commit/cc9b330))
- Add topLevelNamedReexports to TypeScript plugin configuration ([50516fa](https://github.com/adamjosefus/fx-fetch/commit/50516fa))
- Improve tree shaking ability ([#38](https://github.com/adamjosefus/fx-fetch/pull/38))

### ❤️ Thank You

- Adam Josefus @adamjosefus

## 1.0.3 (2026-01-03)

### 🩹 Fixes

- Fix formatting of the URL credentials. ([83b8925](https://github.com/adamjosefus/fx-fetch/commit/83b8925))
- Fix the implementation of Url.deleteSearchParam and the dual API ([d8cfa34](https://github.com/adamjosefus/fx-fetch/commit/d8cfa34))

### ❤️ Thank You

- Adam Josefus @adamjosefus

## 1.0.2 (2025-12-27)

### 📐 Refactor

- add deprecation notice for `Response.Response.Options` type ([a2a1ded](https://github.com/adamjosefus/fx-fetch/commit/a2a1ded))
- replace  generic Error with IllegalArgumentException in response handling functions ([804d6f2](https://github.com/adamjosefus/fx-fetch/commit/804d6f2))

### ❤️ Thank You

- Adam Josefus @adamjosefus

## 1.0.1 (2025-12-27)

### 🩹 Fixes

- Implementation of readBodyAsBytesOrThrow fixed. It now returns a Uint8Array, as intended. ([4be1460](https://github.com/adamjosefus/fx-fetch/commit/4be1460))
- Add missing dual api to fetchStream function ([f2050eb](https://github.com/adamjosefus/fx-fetch/commit/f2050eb))

### ❤️ Thank You

- Adam Josefus @adamjosefus

# 1.0.0 (2025-12-25)

### 📐 Refactor

- Update error handling to use `Cause.IllegalArgumentException` in Request, Response and Url processing functions ([b210ab4](https://github.com/adamjosefus/fx-fetch/commit/b210ab4))
- ⚠️  Update `Request.Options` type to be align with `Request.Parts` type. ([e1af448](https://github.com/adamjosefus/fx-fetch/commit/e1af448))

### ⚠️  Breaking Changes

- Update `Request.Options` type to be align with `Request.Parts` type.  ([e1af448](https://github.com/adamjosefus/fx-fetch/commit/e1af448))

### ❤️ Thank You

- Adam Josefus @adamjosefus

## 0.1.3 (2025-12-18)

### 🩹 Fixes

- remove peerDependencies for effect in package.json ([659dc75](https://github.com/adamjosefus/fx-fetch/commit/659dc75))
- update @types/node dependency version in package.json ([12271b9](https://github.com/adamjosefus/fx-fetch/commit/12271b9))
- update referrerPolicy type and normalization in Request handling ([fa72f21](https://github.com/adamjosefus/fx-fetch/commit/fa72f21))
- add exports for Url, Request, Response, Cause, and Fetch modules in package.json ([c3a8870](https://github.com/adamjosefus/fx-fetch/commit/c3a8870))

### ❤️ Thank You

- Adam Josefus @adamjosefus

## 0.1.0

### 🚀 Features

- Add first `fx-fetch` implementation

### ❤️ Thank You

- Adam Josefus @adamjosefus
