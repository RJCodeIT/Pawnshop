import { DataSource } from "typeorm";
import * as sql from 'mssql/msnodesqlv8';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "1434"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/models/**/*.ts"],
  extra: {
    driver: sql,
  },
  options: {
    trustServerCertificate: true,
  },
});
