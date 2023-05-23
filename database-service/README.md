# Database service

This repository contains the database service for the Shift project.

## How to run

Development

```bash
deno task dev
```

Production

```bash
deno task start
```

## How to generate docs

```bash
swagger-jsdoc -d src/swagger-config.json src/routes/*.ts -o docs/openapi.json
```
