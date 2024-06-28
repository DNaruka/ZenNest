import dotenv from "dotenv";
dotenv.config();

export const client = "mysql2";
export const connection = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};
