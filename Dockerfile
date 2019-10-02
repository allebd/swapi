# image to build from
FROM node:10-alpine

# labels
LABEL version="1.0"
LABEL author="allebd"

# enviromental variableas
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# install depencencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000 5432

# start app
CMD [ "npm", "run", "dev"]
