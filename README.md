

# ChaandUI

> **A modern, scalable React design system and component monorepo.**

ChaandUI is a next-generation UI library and design system for React, built for speed, accessibility, and developer experience. It provides a comprehensive set of headless primitives, media components, hooks, and utilities—engineered for real-world product teams and open source contributors.

---

## Features

- **Monorepo architecture** powered by [pnpm](https://pnpm.io/), [Turborepo](https://turbo.build/), and [TypeScript](https://www.typescriptlang.org/)
- **Production-ready React primitives**: Accordion, Badge, Button, Checkbox, DropdownMenu, Input, Popover, Radio, Select, Tabs, Textarea, Toast, Tooltip, Field, Card, Modal, and more
- **Premium media components**: Video Player, Audio Player, Image Viewer, File Preview, File Uploader, and adapters for HLS, DASH, YouTube, Vimeo
- **Reusable hooks** and utility packages for rapid app development
- **Storybook** and **Playground** apps for live component demos and rapid prototyping
- **Comprehensive documentation** with real-world usage examples
- **Strict type safety** and modern linting/formatting
- **MIT Licensed** and open to contributions

---

## Monorepo Structure

```
apps/
	docs/         # Next.js documentation site
	playground/   # Vite-based playground for rapid prototyping
	storybook/    # Storybook for live component demos
packages/
	app/          # App-level utilities and scaffolding
	config-eslint/  # Shared ESLint config
	config-typescript/ # Shared TypeScript config
	hooks/        # Reusable React hooks
	icons/        # Icon library
	media/        # Premium media components (video, audio, image, file)
	primitives/   # Headless UI primitives (core components)
	react/        # Main React component exports
	styles/       # Shared styles and theming
	tokens/       # Design tokens (colors, spacing, etc.)
	utils/        # Utility functions and helpers
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 8

### Install dependencies
```sh
pnpm install
```

### Run Storybook
```sh
pnpm storybook
```

### Run Docs
```sh
pnpm docs
```

### Run Playground
```sh
pnpm --filter @chaandui/playground dev
```

---

## Usage

Install the core package in your app:

```sh
pnpm add @chaandui/react
```

Import and use components:

```tsx
import { Button, Modal } from '@chaandui/react';

export function Example() {
	return (
		<Modal>
			<Button>Open Modal</Button>
		</Modal>
	);
}
```

---

## Contributing

We welcome contributions from the community! To get started:

1. Fork the repo and create a new branch
2. Make your changes and add tests
3. Run `pnpm test` and `pnpm typecheck` to verify
4. Open a pull request with a clear description

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details (coming soon).

---

## License

MIT © 2026 ChaandUI Contributors
