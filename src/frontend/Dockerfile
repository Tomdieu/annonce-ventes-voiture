# Use a smaller base image like Node.js Alpine
FROM node:14-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the project files
COPY . .

# Build the React app
RUN npm run build

# Use a minimal base image for the final production image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy only necessary files from the build-stage image
COPY --from=build-stage /app/build ./build
COPY --from=build-stage /app/package.json .
COPY --from=build-stage /app/node_modules ./node_modules

# Expose the desired port (if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
