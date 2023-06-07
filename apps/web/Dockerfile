FROM node:18 as base

RUN npm install -g @moonrepo/cli

WORKDIR /web
COPY ./.moon/docker/workspace .

RUN moon docker setup

RUN rm -rf apps/web/node_modules/
COPY ./.moon/docker/sources .

EXPOSE 3000
ENV PORT 3000
ENV PROTOCOL_HEADER x-forwarded-proto
ENV HOST_HEADER x-forwarded-host

RUN moon run web:build
RUN ls

RUN moon docker prune

CMD ["node", "apps/web/build/."]