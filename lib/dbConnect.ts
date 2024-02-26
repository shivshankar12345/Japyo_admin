import { Knex, knex } from 'knex'

const postgres = {
  DB_HOST: "165.227.168.233",
  DB_USERNAME: "azad71",
  DB_PASSWORD: "cefb9dae6",
  DB_PORT: 5432,
  DB_NAME: "japyo_dev",
};


const node_env = "production";

const DBConfig = () => {
  const config = {
    client: "pg",
    pool: {
      min: 2,
      max: 100,
    },
    dialect: "postgres",
    // debug: true,
    connection: "",
  };

  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = postgres;
  config.connection = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  return config;
};

const dbConnect = knex(DBConfig());

export default dbConnect;