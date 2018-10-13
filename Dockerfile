FROM node:8.12-jessie
WORKDIR /usr/src/app
COPY ./outfitter-web-app .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]