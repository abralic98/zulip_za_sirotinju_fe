FROM node:18-alpine AS base
# FROM node:18 AS base

ARG next_public_graphql
ARG nextauth_secret
ARG ws_link
ARG nextauth_url
ARG next_public_firebase_api_key
ARG next_public_firebase_auth_domain
ARG next_public_firebase_project_id
ARG next_public_firebase_storage_bucket
ARG next_public_firebase_messaging_sender_id
ARG next_public_firebase_app_id


ENV NEXT_PUBLIC_GRAPHQL=$next_public_graphql
ENV NEXTAUTH_SECRET=$nextauth_secret
ENV WS_LINK=$ws_link
ENV NEXTAUTH_URL=$nextauth_url
ENV NEXT_PUBLIC_FIREBASE_API_KEY=$next_public_firebase_api_key
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$next_public_firebase_auth_domain
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$next_public_firebase_project_id
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$next_public_firebase_storage_bucket
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$next_public_firebase_messaging_sender_id
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$next_public_firebase_app_id

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
