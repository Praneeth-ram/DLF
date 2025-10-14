# Use Node.js official image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./
COPY vite.config.* ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the app for production
RUN npm run build

# Expose Vite port (preview mode)
EXPOSE 4173

# Start the app in production preview mode
CMD ["npm", "run", "preview", "--", "--port", "4173", "--host"]
