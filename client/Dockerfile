# Stage 1: Build Vite React App
FROM node:20-slim AS builder

# Install necessary packages
RUN apt-get update && apt-get install -y python3 make g++

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app for production
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine

# Copy build output to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Render
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
