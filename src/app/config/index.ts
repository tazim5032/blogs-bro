import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  default_pass: process.env.DEFAULT_PASS,
  NODE_ENV: process.env.NODE_ENV,
  access_secret: process.env.JWT_ACCESS_SECRET,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  access_expire: process.env.JWT_ACCESS_EXPIRES,
  refresh_expire: process.env.JWT_REFRESH_EXPIRES,
};
