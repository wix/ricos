FROM node:10-alpine
ADD e2e/test-env /var/app
WORKDIR /var/app
RUN npm install
CMD npm start
EXPOSE 3002
