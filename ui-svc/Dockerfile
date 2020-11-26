FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/ui-svc
WORKDIR /var/www/ui-svc
ADD . /var/www/ui-svc
RUN npm install
CMD npm run build && npm run dev:ssr
