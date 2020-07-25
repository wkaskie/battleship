# Use an official Node runtime as a parent image
FROM node:14.5.0-alpine

# Set the working directory to /app
WORKDIR '/app'

# Copy package.json to the working directory
COPY package.json .

# Install any needed packages specified in package.json
RUN yarn

# Copying the rest of the code to the working directory
COPY . .

# Make port 3030 available to the world outside this container
EXPOSE 3030

# Run index.js when the container launches
CMD yarn serve