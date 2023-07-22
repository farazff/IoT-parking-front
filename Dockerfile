# Base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Expose the port used by the development server
EXPOSE 8080

# Start the development server
CMD ["npm", "run", "dev"]
