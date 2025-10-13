# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm cache clean --force && npm install --platform=linux

# Copy project files
COPY . .

RUN sed -i 's/tsc -b && vite build/vite build/g' package.json

# Build the app with increased memory limit
RUN NODE_OPTIONS=--max_old_space_size=4096 npm run build

# Production stage - use a simple HTTP server
FROM node:20-alpine

WORKDIR /app

# Install serve package globally
RUN npm install -g serve

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy built files from build stage
COPY --from=build /app/dist ./dist

EXPOSE 3007

CMD ["serve", "-s", "dist", "-l", "3007"]