import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    DATABASE_URL: string;

}

const envVarsSchema = joi.object({
    PORT: process.env.PORT,
})
.unknown(true);

const { error, value } = envVarsSchema.validate( process.env );

if ( error ) {
    throw new Error(`Config validation error: ${ error.message }`);
}

const envVars: EnvVars = value;

export const envs = {
    port: value.PORT,
    databaseUrl: value.DATABASE_URL,
}


