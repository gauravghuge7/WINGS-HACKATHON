FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Add local node_modules binaries to PATH
ENV PATH ./node_modules/.bin:$PATH

# Expose Vite development port
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev"]
