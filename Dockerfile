FROM node:lts
# Create app directory
WORKDIR /usr/src/app

COPY . /usr/src/app/

# Install app dependencies

RUN npm install -g @angular/cli@latest

RUN npm install

# Bundle app source
CMD ["ng", "serve", "--host", "0.0.0.0"]
