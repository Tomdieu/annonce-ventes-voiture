# Use a smaller base image like Node.js Alpine
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the project files
COPY . .

# Build the React app
RUN npm run build

# Expose the desired port (if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "run","preview"]
