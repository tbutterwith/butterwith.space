# Agent Instructions

- This is a single Next.js 16 Pages Router site; route entrypoints are under `pages/`, with shared UI in `components/` and data helpers in `util/`.
- Next.js 16 requires Node.js 20.9 or newer; `next dev` and `next build` use Turbopack by default, and this repository has no custom webpack config.
- Use `pnpm` with the pinned package manager version `pnpm@9.15.4`; run commands from this directory.
- `pnpm dev` starts the development server; `pnpm start` serves a prior production build.
- `pnpm build` must be run from the repository root and first runs `scripts/generate-sitemap.js`, which rewrites the tracked `public/sitemap.xml` and `public/rss.xml`, then runs `next build`.
- The lint command is `pnpm lint` (`eslint .`); `next lint` was removed in Next.js 16, and there is no test or typecheck script in `package.json`.
- Use `pnpm exec prettier --check <files>` for focused formatting verification; Prettier loads `prettier-plugin-tailwindcss` from `prettier.config.js`.
- Blog posts are Markdown files in `_posts/`; only files ending in `.md` are loaded, while files such as `.md.bak` are ignored.
- Each post needs front matter for `title`, `date` (`yyyy-MM-dd`), `slug`, and `tags`; `description` is optional but is used for metadata and RSS when present.
- Keep the post filename and front-matter `slug` aligned: static routes are generated from the filename, but index links use the front-matter slug.
- Adding or changing a post requires regenerating the tracked RSS and sitemap outputs before release, normally via `pnpm build`.
