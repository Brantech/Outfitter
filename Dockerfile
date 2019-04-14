FROM node:8.12-jessie
WORKDIR /usr/src/app
COPY ./outfitter-web-app .
RUN npm install
EXPOSE 3001
CMD [ "npm", "start" ]