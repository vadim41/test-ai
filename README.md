# test-ai

This repository contains a minimal [Nest.js](https://nestjs.com/) project.

## Development

Install dependencies (requires internet access) and start the development server:

```bash
npm install
npm run start
```

The application will listen on http://localhost:3000 by default.

## Docker Compose

A `docker-compose.yml` is provided to run the application together with Kafka. Run:

```bash
docker-compose up --build
```

The app will be available on port `3000` and Kafka will listen on `localhost:9092`.
