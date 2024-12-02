import { Redis } from "ioredis";
import express from "express";
import {PrismaClient} from "@prisma/client";

let redis: Redis | null = null;
const expressPort = 3000;

const { REDIS_CONTAINER_NAME } = process.env;
if (!REDIS_CONTAINER_NAME) {
  throw new Error('Runtime error: unable to resolve env var REDIS_CONTAINER_NAME');
}

const prisma = new PrismaClient();

const getRedis = () => {
  if (redis == null) {
    redis = new Redis(6379, REDIS_CONTAINER_NAME);
  }
  return redis;
};

const server = express();

interface HealthResponse {
  redis: {
    ping: string | null;
    env: {
      endpoint: string | null;
    };
  };
  serverTime: number;
}

server.get("/ping", (_, res) => {
  res.json({ ping: "pong" });
});

server.get("/health", async (_, res) => {
  const response: HealthResponse = {
    redis: {
      ping: null,
      env: {
        endpoint: process.env.REDIS_NAMESPACE || null,
      },
    },
    serverTime: Date.now(),
  };
  res.status(200); // Be explicit -- this will be used for health checks
  try {
    response.redis.ping = await getRedis().ping();
  } catch (e) {
    res.status(500);
    console.error(e);
  }
  res.json(response);
});

server.get("/set/:key/:value", async (req, res) => {
  const { key, value } = req.params;
  await getRedis().set(key, value);
  res.json({
    ok: true,
    message: `set ${key} to ${value}`,
  });
});

server.get("/get/:key", async (req, res) => {
  const value = await getRedis().get(req.params.key);
  res.json({
    [req.params.key]: value,
  });
});

server.get('/users/create', async (_, res) => {
  const user = await prisma.user.create({
    data: {
      email: 'd@s.com'
    }
  });
  res.json(user);
});

server.get('/users/list', async (_, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

function main() {
  server.listen(expressPort, "0.0.0.0", () => {
    console.log(`Server listening at port ${expressPort}`);
  });
}

main();
