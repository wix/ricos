FROM node:10-alpine
ADD . /var/app
WORKDIR /var/app
CMD cd e2e/test-env && npm start
EXPOSE 3002
