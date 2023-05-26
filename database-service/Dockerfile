FROM denoland/deno:latest as base

WORKDIR /app

COPY . ./

RUN deno cache src/main.ts

CMD ["deno", "task", "start"]