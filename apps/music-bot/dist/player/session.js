import { randomBytes } from "node:crypto";
import ms from "ms";
import { useRedisAsync } from "#bot/hooks/useRedis";
const generateToken = () => randomBytes(32).toString("hex");
export async function generateSession(user, guild, timeout = "3h") {
    const redis = await useRedisAsync();
    const mkey = `magic_link::${user.id}::${guild.id}`;
    const old = await redis.get(mkey);
    if (old) {
        const res = await validateSession(old);
        if (res)
            return { data: res, token: old };
    }
    const dur = ms(timeout) / 1000;
    const token = generateToken();
    const data = {
        id: user.id,
        avatar: user.displayAvatarURL(),
        username: user.username,
        displayName: user.displayName,
        guildId: guild.id,
        guildName: guild.name,
        guildIcon: guild.iconURL(),
        guildAcronym: guild.nameAcronym,
    };
    await redis.setex(`session::${token}`, dur, JSON.stringify(data));
    // TODO: might need a better option for this
    await redis.setex(mkey, dur, token);
    return { data, token };
}
export async function validateSession(token) {
    const redis = await useRedisAsync();
    try {
        const old = await redis.get(`session::${token}`);
        if (old)
            return JSON.parse(old);
        return null;
    }
    catch {
        return null;
    }
}
