FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy TypeScript configuration and source files
COPY tsconfig.json .
COPY src/ ./src/

EXPOSE 3000

# Compile TypeScript to JavaScript
RUN npm run build

# Bundle app source
COPY . .

CMD [ "node", "./src/index.js" ]
