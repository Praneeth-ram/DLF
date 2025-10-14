# Dockerfile for Vite frontend
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./
COPY vite.config.* ./

# Install dependencies
RUN npm install

# Copy source files
# COPY ./src ./src
COPY . .

# Build the app for production
RUN npm run build

# Expose Vite port
EXPOSE 5173

# Start the app in production preview mode
CMD ["npm", "run", "preview", "--", "--port", "5173", "--host"]
