import http, { Server } from "http";
import { Application } from "express";
import db from "./app/db";

const startServer = async (app: Application) => {
  await db();

  const server: Server = http.createServer(app);

  server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
  });
};

export default startServer;
