# jacobheater.com

[![Deploy Next.js site to Pages](https://github.com/jacobheater/jacobheater.github.io/actions/workflows/nextjs.yml/badge.svg)](https://github.com/jacobheater/jacobheater.github.io/actions/workflows/nextjs.yml)

Personal website, resume, blog, and developer tools for Jacob Heater.

🌐 **Live:** [jacobheater.com](https://jacobheater.com)

## Features

- **Resume** — Print-friendly resume with PDF export, structured data for SEO
- **Blog** — Markdown-based entries on technology, theology, and more
- **Developer Tools** — Markdown viewer/editor with syntax highlighting
- **Dark/Light Theme** — Persisted preference with flash-free loading

## Tech Stack

- [Next.js 16](https://nextjs.org) with App Router
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [MUI](https://mui.com) components
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for code editing

## Development

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). Hot reloading is enabled—no need to restart the server when making changes.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/app/
├── page.tsx              # Home page
├── layout.tsx            # Root layout with SEO metadata
├── about/resume/         # Resume page + components
├── blog/                 # Blog system with markdown rendering
├── tools/                # Developer tools (markdown viewer/editor)
└── components/           # Shared components
```

## License

© Jacob Heater. All rights reserved.
