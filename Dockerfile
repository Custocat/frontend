# specify the node base image with your desired version node:<version>
FROM node:latest
# Set default CMD env to start
ENV CMD=start
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install
# Copy environment file
COPY .env /usr/src/app
# Copy images
COPY ./images /usr/src/app/images
#Copy octocats
# COPY ./octocats /usr/src/app/octocats
# Copy server files
COPY index.html /usr/src/app/
COPY server.js /usr/src/app/
COPY style.css /usr/src/app/
# replace this with your application's default port
EXPOSE 80
# Start server
CMD npm ${CMD}