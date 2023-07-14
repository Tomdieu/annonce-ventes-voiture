# Use an official Node.js runtime as the base image
FROM node:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install --force --latest

# Copy the entire project to the working directory
COPY . .

# Build the TypeScript React project
RUN yarn build

# Expose the desired port (change the port number if needed)
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
