import { HooksRegistry, Symbols } from "./registry.js";
export function useRedisAsync() {
    return new Promise((resolve) => {
        const returnIfFound = () => {
            const redis = HooksRegistry.get(Symbols.kRedis);
            if (redis)
                return resolve(redis);
            setTimeout(returnIfFound, 1000);
        };
        returnIfFound();
    });
}
export function useRedis() {
    const redis = HooksRegistry.get(Symbols.kRedis);
    if (!redis) {
        throw new Error("Redis has not been initialized");
    }
    return redis;
}
