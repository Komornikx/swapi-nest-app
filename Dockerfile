# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the source code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 3010

# Start the application
CMD ["npm", "run", "start"]