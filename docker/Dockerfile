FROM node:16.13.1-alpine AS base

# Stage 1: Base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && \
    chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

# Stage 2: Dependencies
FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci

# Stage 3: Build
COPY --chown=node:node . .
FROM dependencies AS build
RUN node ace build --production

# Stage 4: Production
FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --production
COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]
