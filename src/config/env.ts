import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3333;

export const DATABASE_URL = process.env.DATABASE_URL || "";

export const NODE_ENV = process.env.NODE_ENV || "development";