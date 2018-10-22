import { config } from 'dotenv';

config({});

interface IENV {
  PORT: number | string;
  DEBUG: boolean;
  NODE_ENV: string;
  NSQ_URL: string;
  API_URL: string;
  SENTRY_DNS?: string;
}

export const ENV: IENV = process.env as any;
