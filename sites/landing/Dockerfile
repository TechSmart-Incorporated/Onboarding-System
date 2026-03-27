# Build context: /home/nick  (run via docker-compose from docker/landing/)

# ── Stage 1: Build — landing ─────────────────────────────────────────────────
FROM node:22-alpine AS builder-landing

WORKDIR /app
COPY sites/landing/package.json sites/landing/package-lock.json* ./
RUN npm ci --ignore-scripts
COPY sites/landing/ .
RUN npm run build

# ── Stage 2: Serve (Nginx) ───────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove nginx defaults
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy all nginx configs (shared settings + per-site server blocks)
COPY docker/nginx/ /etc/nginx/conf.d/

# Copy built dist into named subdirectory
COPY --from=builder-landing /app/dist /usr/share/nginx/html/landing

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
