FROM denoland/deno:alpine-1.33.4 as base

WORKDIR /app

COPY src/deps.ts ./src/

RUN deno cache src/deps.ts --lock --lock-write

COPY . ./

RUN deno cache src/main.ts --lock --lock-write

USER deno

CMD ["task", "start"]