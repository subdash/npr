import request from "supertest";
import { server } from "./app";
import { closeCache } from "./services/cache";

describe("Server route tests", () => {
  afterAll(() => {
    closeCache();
  });

  it("/ping should return pong response", async () => {
    const response = await request(server).get("/ping").send();
    expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual({ ping: "PONG" });
  });
  it("/health should return health check response", async () => {
    const response = await request(server).get("/health").send();
    expect(response.statusCode).toStrictEqual(200);
    expect(response.body.cache.ping).toStrictEqual("PONG");
  });
  describe("Cache endpoints", () => {
    it("/set and /get endpoints write/read to/from Redis", async () => {
      const setResponse = await request(server).put("/set/a/b").send();
      expect(setResponse.statusCode).toStrictEqual(200);
      expect(setResponse.body).toStrictEqual({
        ok: true,
        message: "set a to b",
      });
      const getResponse = await request(server).get("/get/a").send();
      expect(getResponse.statusCode).toStrictEqual(200);
      expect(getResponse.body).toStrictEqual({
        a: "b",
      });
    });
  });
  describe("Database endpoints", () => {
    const fakeTestEmail = "test.email@fake.com";
    it("users/ routes create and list created users", async () => {
      const setResponse = await request(server)
        .post("/user")
        .send({ email: fakeTestEmail });
      expect(setResponse.statusCode).toStrictEqual(200);
      expect(setResponse.body.email).toStrictEqual(fakeTestEmail);
      const getResponse = await request(server).get("/user").send();
      expect(getResponse.statusCode).toStrictEqual(200);
      expect(
        getResponse.body.some(
          ({ email }: { email: string; id: number }) => email == fakeTestEmail
        )
      ).toStrictEqual(true);
    });
  });
});
