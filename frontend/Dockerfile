# Use the latest LTS version of Node.js
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json /app/frontend/

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . /app/frontend/

# Expose the port your app runs on
EXPOSE 5173

CMD ["npm", "run", "dev"]