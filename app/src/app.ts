import express from "express";

import DefaultRouter from "./routing/router";

const expressPort = 3000;

export const server = express();
server.use(express.json());
server.use(DefaultRouter);

function main() {
  if (process.env.NODE_ENV == "test") {
    // Since we're using supertest, we don't want it to run the server
    // on port 3000.
    return;
  }
  server.listen(expressPort, "0.0.0.0", () => {
    console.log(`Server listening at port ${expressPort}`);
  });
}

main();
