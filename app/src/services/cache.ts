import { Redis } from "ioredis";
let cache: Redis | null = null;
const { REDIS_CONTAINER_NAME } = process.env;
if (!REDIS_CONTAINER_NAME) {
  throw new Error(
    "Runtime error: unable to resolve env var REDIS_CONTAINER_NAME"
  );
}

export const getCache = () => {
  if (cache == null) {
    cache = new Redis(6379, REDIS_CONTAINER_NAME);
  }
  return cache;
};

export const closeCache = () => {
  if (cache == null) return;
  cache.disconnect();
};
