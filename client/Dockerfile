FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install all dependencies (including devDependencies)
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Add local node_modules binaries to PATH
ENV PATH ./node_modules/.bin:$PATH

# Expose Vite default port
EXPOSE 5173

# Run the Vite development server
CMD ["npm", "run", "dev"]
