# Use an official Node.js runtime as the base image
FROM node:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Copy the entire project to the working directory
COPY . .

# # Build the app
# RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run the app
CMD [ "npm", "run", "dev" ]
