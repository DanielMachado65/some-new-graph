FROM node:16.20-alpine3.18
ENV NPM_TOKEN=757e5339-4961-46ed-9d50-cf9565d13fa8
RUN mkdir /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node . ./
USER node
RUN npm install && npm cache clean --force --loglevel=error
HEALTHCHECK --interval=21s --timeout=3s --start-period=10s CMD npm run healthcheck
CMD ["npm", "run", "start"]

