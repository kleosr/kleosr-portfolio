# Security

This repository is a static Vite and React site. There is no API, auth, or server runtime in production.

- Do not commit secrets, `.env` files, or private keys.
- GitHub stats are a committed snapshot. `scripts/snapshot-github.mjs` may use the public API or `GITHUB_TOKEN` at build time. Never commit a token. The browser must not call api.github.com.
- Report issues at https://github.com/kleosr.
- Live hosting is Surge (`dist/`). Treat `dist` as public.
