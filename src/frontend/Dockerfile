# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and yarn.lock to the working directory
COPY package.json package-lock.json ./


# Install dependencies
RUN npm install --save --force --silent

# Copy the entire project to the working directory
COPY . .

EXPOSE 3000

# Set the command to run the app using the serve command
CMD ["npm", "run", "dev"]
