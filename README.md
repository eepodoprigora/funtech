# Funtech (Next.js)

## Requirements

- Node.js 20+
- pnpm (via Corepack)
- Docker (optional)

## Run without Docker

### Install

```bash
pnpm install
pnpm dev
```

#### Open: http://localhost:3000

## Run without Docker

### Build image

```bash
docker build -t funtech .
```

### expose app on 3001

```bash
docker run --rm -p 3001:3000 funtech
```

#### Open: http://localhost:3001
