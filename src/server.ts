import http, { Server } from "http";
import { Application } from "express";
import db from "./app/db";

const startServer = async (app: Application) => {
  try {
    await db();

    const server: Server = http.createServer(app);

    server.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  } catch (err: any) {
    console.log("Failed to start server");
    console.error(err);
    console.error(err.message);
    process.exit(1);
  }
};

export default startServer;
