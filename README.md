# tslateman.com

[![CI](https://github.com/tslateman/site/actions/workflows/ci.yml/badge.svg)](https://github.com/tslateman/site/actions/workflows/ci.yml)

Personal site. Thoughts on living and working well — where philosophy meets programming.

Built with [Astro](https://astro.build/) + [AstroPaper](https://github.com/satnaing/astro-paper), styled with [Tailwind CSS](https://tailwindcss.com/), deployed on [Vercel](https://vercel.com/).

## Development

```bash
pnpm install
pnpm run dev       # localhost:4321
pnpm run build     # production build → ./dist/
pnpm run preview   # preview production build
```

## Structure

```
src/
├── data/blog/     # blog posts (markdown)
├── pages/         # routes (index, about, etc.)
├── layouts/       # page layouts
├── components/    # shared components
├── styles/        # global.css, typography.css
└── config.ts      # site metadata
```

## License

Content is mine. Theme based on [AstroPaper](https://github.com/satnaing/astro-paper) (MIT).
