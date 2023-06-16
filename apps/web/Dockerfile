FROM node:18 as base

# Install Moonrepo CLI globally
RUN npm install -g @moonrepo/cli

# Set the working directory
WORKDIR /web

# Copy the Moonrepo workspace configuration
COPY ./.moon/docker/workspace .

# Set up Moonrepo
RUN moon docker setup

# Copy the project sources
COPY ./.moon/docker/sources .

# Expose port and set environment variables
EXPOSE 5002
ENV PORT=5002
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host

# Build the web application
RUN moon run web:build

# Remove unnecessary Docker artifacts
RUN moon docker prune

# Specify the command to run the application
CMD ["node", "apps/web/build/index.js"]
