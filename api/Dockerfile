FROM node:11
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN yarn install
EXPOSE 4000
CMD ["yarn", "production"]