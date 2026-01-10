# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

fx-fetch is an Effect-based HTTP fetching library that provides simple, immutable, clonable, and effect-based HTTP request/response handling. The library wraps the native `fetch` API with Effect's functional programming patterns.

## Development Commands

### Building
```bash
pnpm run build          # Build the library using zshy
pnpm run validate       # Type check with TypeScript (no emit)
```

### Testing
```bash
pnpm run test           # Run all tests in src/ with vitest
vitest run <path>       # Run specific test file
```

### Linting & Formatting
```bash
pnpm run fmt            # Check formatting with Biome (fails on warnings)
pnpm run fmt:write      # Fix formatting issues automatically
pnpm run circular       # Check for circular dependencies with dpdm
```

### Pre-publish
```bash
pnpm run prepublishOnly # Runs validate → test → fmt → build
```

## Architecture

### Core Modules

The library is organized into five main modules, each exported as a namespace:

- **Url**: Immutable URL handling with search parameter manipulation
- **Request**: Immutable HTTP request objects with builder methods
- **Response**: Immutable HTTP response objects with body reading utilities
- **Fetch**: Effect service for executing requests
- **Cause**: Error types for various failure modes (malformed bodies, parsing errors, etc.)

### Effect Integration

This library is built on Effect (https://effect.website), a TypeScript framework for building robust applications. Key patterns:

1. **Services**: `Fetch.Fetch` is an Effect service that can be provided to run HTTP requests
   - `FetchLive` is the production implementation using `globalThis.fetch`
   - Services enable dependency injection and testing (mock implementations)

2. **Immutability**: All `Request` and `Response` objects are immutable. Modification methods return new instances.

3. **Pipeable**: All core types implement Effect's `Pipeable` interface, allowing chaining with `.pipe()`

4. **Error Handling**: Functions return `Effect<Success, Error, Requirements>` instead of throwing
   - Errors are typed (e.g., `FetchError`, `AbortError`, `NotOkError`, `MalformedJsonError`)
   - Use `Effect.catchTag()` to handle specific error types

5. **Safe vs Unsafe**:
   - `make()` functions return `Option<T>` (may fail gracefully)
   - `unsafeMake()` functions throw on invalid input (use when input is known valid)

### Module Structure

Each module (Request/Response/Url) follows this pattern:

```
src/Request/
├── Request.ts          # Type definitions and interfaces
├── index.ts            # Public exports
├── make.ts             # Constructor (returns Option)
├── unsafeMake.ts       # Constructor (throws on error)
├── get*.ts             # Getter functions
├── set*.ts             # Setter functions (return new instance)
├── append*.ts          # Append functions (return new instance)
├── read*.ts            # Body reading functions (Effect-based)
└── *.test.ts           # Tests co-located with implementations
```

### Body Handling

Both Request and Response store bodies as `Promise<Blob> | undefined`. Reading functions:
- Return Effects that handle parsing errors as typed failures
- Are single-use (body consumption follows Fetch API semantics)
- Include variants: `readText`, `readJson`, `readJsonWithSchema`, `readBlob`, `readArrayBuffer`, `readBytes`, `readStream`, `readFormData`

### Package Exports

The library uses subpath exports for tree-shaking:

```typescript
import { Fetch } from 'fx-fetch'              // Main export
import { Fetch } from 'fx-fetch/Fetch'        // Direct module import
import { Request } from 'fx-fetch/Request'    // Direct module import
```

All subpaths are built from `src/<Module>/index.ts` using zshy bundler.

## TypeScript Configuration

- **Target**: ES2022, ESNext modules
- **Module Resolution**: bundler (modern bundler-compatible resolution)
- **Strict Mode**: Enabled with additional strict checks
- **Effect Language Service**: Integrated plugin for Effect-specific TypeScript support
- **Lib Agnostic**: Should work with any `tsconfig.json` lib configuration (current: ESNext, DOM)

## Code Style (Biome)

- Single quotes for strings
- 100 character line width
- 2 spaces indentation
- Semicolons required
- ES5 trailing commas
- Import organization: Bun → Node → Packages → URL → Alias → Path
- No `any` types (error level)
- No non-null assertions (error level)
- Use `import type` where possible (warn on `useImportType`)

## Key Conventions

1. **Immutable Builders**: Methods like `Request.setUrl()` or `Response.setHeaders()` return new instances
2. **Type Safety**: Use branded types (`TypeId` symbols) for runtime type checking (`isRequest`, `isResponse`, etc.)
3. **Headers**: Internal representation uses `HeadersIntermediate` (efficient record type), converted to `Headers` (Web API) only when needed
4. **Testing**: Tests are co-located with implementation files (`*.test.ts`)
5. **Effect Generators**: Prefer generator-based `Effect.gen()` and `fnUntraced()` for Effect code
6. **Options vs Parts**: `Request.Parts` is preferred over deprecated `Request.Options` pattern

## Dependencies

- **effect**: ^3 (peer dependency, core framework)
- **@types/node**: >=20 (for Node.js types)
- **zshy**: Build tool for dual ESM package generation
- **vitest**: Testing framework
- **biome**: Linting and formatting
- **dpdm**: Circular dependency detection
