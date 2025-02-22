FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all source files
COPY . .

# Expose the development port
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev"]
