---
name: coding-style
description: Guidelines for formatting TypeScript code in the fx-fetch package.
---

# Format Skill

This skill should be used only for library code, test code, and code snippets in JSDoc.

**Target Files**: `packages/fx-fetch/**/*.ts`

**When to use**: Use this skill after writing or modifying TypeScript code in the fx-fetch package to ensure it follows project style guidelines.

## Workflow

1. Run `pnpm fmt:write` to apply automatic formatting
2. Apply the manual style guidelines from this skill
3. Run `pnpm fmt:write` again to ensure formatting is correct
4. Verify changes by running `pnpm validate` and `pnpm test`

This skill can operate in three modes: library code, test code, and JSDoc code snippets.

## Common Guidelines

1. Always use single quotes for strings. Use template literals when interpolation is needed.
2. Wrap switch cases in curly braces.
3. Use trailing commas in multi-line object and array literals.
4. Keep blank line after import statements.
5. Keep blank line after if/else blocks.
6. Use explicit return types for top-level functions and methods. This rule can be relaxed for small inline functions.
7. Prefer immutable data structures and avoid mutating function parameters.

After all changes, run `pnpm fmt:write` to ensure formatting is correct.
Also run `pnpm validate` and `pnpm test` to verify no issues were introduced.

---

## Library Code

Use common guidelines plus the following:

Take care about `verbatimModuleSyntax` option in `tsconfig.json`. Take care about best tree-shaking practices. Import only what is necessary.

1. If we import a type from a `effect` package, we should import it from its specific module path instead of the root package to ensure better tree shaking. (e.g., `import { type Effect } from 'effect/Effect';`)
2. If we import functions with same name from different modules, we should alias them to avoid naming conflicts. (e.g., `import { map as effectMap } from 'effect/Effect';`)
3. Avoid using `import * as` syntax to prevent importing unnecessary code. Only exception is when importing file "localThis.ts" as module namespace. (e.g., `import * as localThis from './localThis';`)
4. Remove any unused imports to keep the code clean.

---

## Test Code

Use common guidelines plus the following:

1. Use `describe` blocks to group related tests together.
2. Use `it` blocks for individual test cases.
3. Use simple test names that clearly describe the behavior being tested. Do not be too generic and verbose.
4. Make small tests that focus on a single behavior or scenario.
5. Make small amount of test data needed for the test.
6. Test edge cases and error scenarios.
7. Test types using `expectTypeOf` from `vitest` library.
8. Use verbose variable and function names to improve readability.
9. Import library code functions from root file instead of specific module paths to ensure testing the public API.
10. Import EffectTS stuff from root package paths instead of specific module paths to ensure testing the public API. (e.g., `import { Effect, Option, Either } from 'effect';`)

---

## JSDoc and JSDoc Code Snippets

Use common guidelines plus the following:

1. We want to use only following JSDoc tags: `@since`, `@example`, `@category`, `@see`, `@link`, `@internal` and `@deprecated`.
2. The JSDoc tags `@since`, `@category`, and `@example` should always be present in public API documentation. Other tags can be used as needed.
3. Ensure that code snippets in JSDoc comments are properly formatted and follow the same guidelines as library code.
4. Ensure that code snippets are relevant to the surrounding documentation and accurately illustrate the concepts being discussed.
5. Ensure that code snippets are complete and can be understood in isolation.
6. Use triple backticks (```) to denote code blocks in JSDoc comments.
7. Specify the language for code blocks in JSDoc comments (e.g., ```ts for TypeScript code).
8. Avoid using overly complex code snippets that may confuse readers.
9. Use "ASCII" arrows for describing focused types in JSDoc examples. Use characters `◀︎ ▶︎ ▲ ▼ ┌ ┐ └ ┘ ─ │` to draw boxes around focused types in JSDoc examples.
10. Make sure to have same JSDoc comments for overloaded functions. (e.g., Dual APIs functions)