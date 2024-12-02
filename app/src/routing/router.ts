import { Router } from "express";
import { createUser, get, getUsers, health, ping, set } from "./handler";

const router = Router();

router.get("/ping", ping);
router.get("/health", health);
router.put("/set/:key/:value", set);
router.get("/get/:key", get);
router.post("/user", createUser);
router.get("/user", getUsers);

export default router;
