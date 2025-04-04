# localist-t3

A listing board, featuring:

- social auth
- image upload
- search
- infinite scroll
- mobile responsiveness
- geolocation and embedded maps
- image carousels
- static pre-rendering
- [90+ Lighthouse score](https://pagespeed.web.dev/analysis/https-localist-t3-vercel-app-feed/ay6y8ir1py?form_factor=desktop)

## Pre-requisites

1. Node 20+
2. pnpm

```sh
corepack enable
corepack prepare pnpm@latest --activate
```

3. Vercel CLI

```sh
pnpm i -g vercel@latest
```

## Local Setup

1. Link to Vercel and pull environment variables:

```sh
vercel link
vercel env pull
```

2. Initialise and run the app:

```sh
pnpm i
pnpm prisma generate dev
pnpm dev
```

---

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
