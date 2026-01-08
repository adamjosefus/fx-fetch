## 1.0.4 (2026-01-08)

### 🚀 Features

- Add examples for handling structured error payloads in documentation ([8f0e5ca](https://github.com/adamjosefus/fx-fetch/commit/8f0e5ca))

### 🩹 Fixes

- Correct TaggedError tag for MalformedReadableStreamError ([de78128](https://github.com/adamjosefus/fx-fetch/commit/de78128))
- Throw RuntimeException for unknown fetch errors ([0913ecc](https://github.com/adamjosefus/fx-fetch/commit/0913ecc))
- Update example in toJsHeaders documentation for clarity and consistency ([0f0e467](https://github.com/adamjosefus/fx-fetch/commit/0f0e467))

### 📐 Refactor

- Remove unused CSS variables and styles from custom.css ([51df1a3](https://github.com/adamjosefus/fx-fetch/commit/51df1a3))
- Update content structure and improve clarity in index.mdx ([5e8b44c](https://github.com/adamjosefus/fx-fetch/commit/5e8b44c))
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
