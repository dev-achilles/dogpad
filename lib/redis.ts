import Redis from "ioredis";

const redis = !process.env.NO_REDIS
  ? new Redis(process.env.REDIS_URL, { db: 0 })
  : undefined;

export default redis;

export async function getJson<T extends Record<string, any>>(
  key: string,
  defaultValue = {} as T
): Promise<T> {
  const stored = await redis.get(key);
  if (!stored) return defaultValue;
  return JSON.parse(stored);
}
