import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value: env } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = env;

export const envs = {
  port: envVars.PORT,
  productsMsHost: envVars.PRODUCTS_MS_HOST,
  productsMsPort: envVars.PRODUCTS_MS_PORT,
};