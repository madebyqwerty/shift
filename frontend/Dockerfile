FROM node:18-alpine as base

WORKDIR /frontend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000

ENV PORT 3000
ENV PROTOCOL_HEADER x-forwarded-proto
ENV HOST_HEADER x-forwarded-host

CMD ["node","build"]