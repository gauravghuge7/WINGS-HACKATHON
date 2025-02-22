# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Stage 2: Production
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only the built files and dependencies from the builder stage
COPY --from=builder /app /app

# Ensure non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production

# Run the application
CMD ["npm", "run", "start"]
