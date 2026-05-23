FROM node:24.11.0-alpine AS base

RUN corepack enable && corepack prepare pnpm@10.33.3 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# dev
FROM base AS development

RUN pnpm install

COPY . .

EXPOSE 3000

#RUN pnpm run start:dev
CMD ["pnpm", "run", "start:dev"]

# ──────────────────────────────────────────────
# Build stage – compile TypeScript
# ──────────────────────────────────────────────
FROM base AS build

RUN pnpm install

COPY . .

RUN pnpm run build

# ──────────────────────────────────────────────
# Production stage – lean runtime image
# ──────────────────────────────────────────────
FROM node:24.11.0-alpine AS production

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]