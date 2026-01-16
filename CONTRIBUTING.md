# Contributing to Fx-Fetch

Thank you for your interest in contributing to Fx-Fetch! This document provides guidelines for contributing to both the library and the documentation website.

## Table of Contents

- [Library (`packages/fx-fetch`)](#library-packagesfx-fetch)
- [Website (`packages/website`)](#website-packageswebsite)
- [General Guidelines](#general-guidelines)

---

## Library (`packages/fx-fetch`)

The core Fx-Fetch library provides immutable, clonable, and effect-based HTTP fetching.

### Prerequisites

- Node.js >= 20
- [pnpm](https://pnpm.io/) package manager >= 10

### Setup

```bash
# Clone the repository
git clone https://github.com/adamjosefus/fx-fetch.git

# Install dependencies
pnpm install

# Navigate to the library package
cd ./packages/fx-fetch # Or `code ./packages/fx-fetch` to open in VSCode
```

### Development Commands

```bash
# Type checking
pnpm validate

# Run tests
pnpm test

# Format & lint code
pnpm fmt
pnpm fmt:write # to auto-fix formatting issues

# Build the library
pnpm build
```

### Project Structure

```text
packages/fx-fetch/
├── src/
│   ├── Url/       # Url module
│   ├── Request/   # Request module
│   ├── Response/  # Response module
│   ├── Fetch/     # Fetch service
│   └── Cause/     # Common error types
└── dist/          # Built output
```

### Writing Tests

Tests are written using [Vitest](https://vitest.dev/). Place test files next to the source files with a `.test.ts` extension.

```bash
# Run tests
pnpm --filter fx-fetch test
```

### Code Style

- Follow the existing code patterns and conventions
- Use [Biome](https://biomejs.dev/) for formatting and linting
- Ensure all exports follow the [Effect dual API style](https://effect.website/docs/code-style/dual)

---

## Website (`packages/website`)

The documentation website is built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

### Prerequisites

- Node.js >= 20
- [pnpm](https://pnpm.io/) package manager
- [Bun](https://bun.sh/) (for building API reference)

### Setup

```bash
# From the repository root
pnpm install
```

### Development Commands

```bash
# Start development server
pnpm dev

# Build the website (includes API reference generation)
pnpm website
```

### Project Structure

```
packages/website/
├── src/
│   ├── content/   # Documentation content (MDX/MD files)
│   └── ...        # Astro components and layouts
├── public/        # Static assets
└── bin/           # Build scripts
```

### Writing Documentation

- Documentation pages are written in MDX format
- Place new documentation files in `src/content/docs/`
- API reference is auto-generated from the library source using TypeDoc

---

## General Guidelines

### Commit Messages

Write clear, concise commit messages that describe the change.

### Pull Requests

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Ensure all tests pass (`pnpm test`)
5. Ensure code is formatted (`pnpm fmt`)
6. Submit a pull request

### Reporting Issues

Feel free to open an issue if you:

- Found a bug
- Have a feature request
- Have questions about usage

### Code of Conduct

Be respectful and constructive in all interactions. We welcome contributors of all experience levels.