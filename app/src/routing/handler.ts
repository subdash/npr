import { Request, Response } from "express";
import { getCache } from "../services/cache";
import { HealthResponse } from "../types/response";
import { getDb } from "../services/database";

export const ping = (_: Request, res: Response) => {
  res.json({ ping: "PONG" });
};

export const health = async (_: Request, res: Response) => {
  const response: HealthResponse = {
    cache: {
      ping: null,
      env: {
        endpoint: process.env.REDIS_CONTAINER_NAME || null,
      },
    },
    serverTime: Date.now(),
  };
  res.status(200); // Be explicit -- this will be used for health checks
  try {
    response.cache.ping = await getCache().ping();
  } catch (e) {
    res.status(500);
    console.error(e);
  }
  res.json(response);
};

export const set = async (req: Request, res: Response) => {
  const { key, value } = req.params;
  await getCache().set(key, value);
  res.json({
    ok: true,
    message: `set ${key} to ${value}`,
  });
};

export const get = async (req: Request, res: Response) => {
  const value = await getCache().get(req.params.key);
  res.json({
    [req.params.key]: value,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const user = await getDb().user.create({
    data: {
      email: req.body.email,
    },
  });
  res.json(user);
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await getDb().user.findMany();
  res.json(users);
};
