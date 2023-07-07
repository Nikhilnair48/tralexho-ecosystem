import * as dotenvFlow from "dotenv-flow";

dotenvFlow.config({
  node_env: process.env.NODE_ENV || "development",
});

import mongoose, { Connection } from "mongoose";

const createConnection = async (): Promise<Connection> => {
  const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
  const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

  await mongoose.connect(url);

  const db = mongoose.connection;
  return db;
};

export { createConnection };
