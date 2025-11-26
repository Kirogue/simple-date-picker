FROM node:20-alpine
RUN apk add --no-cache openssl

WORKDIR /app

ENV NODE_ENV=production

# Copy package files first
COPY package.json package-lock.json* ./

# Copy prisma schema before npm ci (needed for prisma generate in postinstall)
COPY prisma ./prisma/

# Install all dependencies (including dev for build)
RUN npm ci && npm cache clean --force

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --omit=dev

# Start command: run migrations then start the server
# HOST=0.0.0.0 to listen on all interfaces (required for Railway)
# PORT is set automatically by Railway, don't override it
CMD HOST=0.0.0.0 npm run docker-start
