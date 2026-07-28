import dotenv from 'dotenv';
dotenv.config();
const required = [
    'PORT',
    'MONGODB_URI',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'NODE_ENV',
];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
}
export const config = {
    port: Number(process.env.PORT),
    mongodbUri: process.env.MONGODB_URI,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    nodeEnv: process.env.NODE_ENV,
};
//# sourceMappingURL=config.js.map