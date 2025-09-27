import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export default {
  env,
  port: process.env.PORT || '3000',
  db: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
  }
};
