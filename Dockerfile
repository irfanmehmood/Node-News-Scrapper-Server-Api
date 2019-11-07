# Install node v10
FROM node:12

# Set the workdir /var/www/myapp
WORKDIR /var/www/myapp

# Copy the package.json to workdir
COPY package*.json ./

# Run npm install - install the npm dependencies
RUN npm install

# Copy application source
COPY . ./

# Copy .env.docker to workdir/.env - use the docker env
COPY .env.docker ./.env

# Expose application ports - (4300 - for API and 4301 - for front end)
EXPOSE 4300 4301

# Generate build
#RUN npm run build

# Start the application
CMD node index.js