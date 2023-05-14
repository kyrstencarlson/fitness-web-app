// export const REDIS_OPTIONS: RedisOptions = {
//   host: process.env.REDIS_HOST || 'localhost',
//   port: Number(process.env.REDIS_PORT) || 6379,
//   password: process.env.REDIS_PASSWORD || null,
//   username: process.env.USERNAME || 'default',
//   connectTimeout: 17000,
//   retryStrategy: (times) => {
//     console.log({ times });
//     if (times > 10) return;
//     return 2 ** times;
//   },
// };

export const DB_ENGINE = 'testEngine';

export const PROVIDER = process.env.PROVIDER || 'AWS';
