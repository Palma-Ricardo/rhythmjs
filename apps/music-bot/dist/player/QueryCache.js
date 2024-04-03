import { serialize, DiscordPlayerQueryResultCache, SearchResult, deserialize, useMainPlayer, } from "discord-player";
export class RedisQueryCache {
    redis;
    EXPIRY_TIMEOUT = 3600 * 5;
    constructor(redis) {
        this.redis = redis;
    }
    createKey(id) {
        return `discord-player:query-cache:${id}`;
    }
    async addData(data) {
        const key = this.createKey(data.query);
        const serialized = JSON.stringify(data.playlist
            ? serialize(data.playlist)
            : data.tracks.map((track) => serialize(track)));
        await this.redis.setex(key, this.EXPIRY_TIMEOUT, serialized);
    }
    async getData() {
        const player = useMainPlayer();
        const data = await this.redis.keys(this.createKey("*"));
        const serialized = await this.redis.mget(data);
        const parsed = serialized
            .filter(Boolean)
            .map((item) => deserialize(player, JSON.parse(item)));
        const res = parsed.map((item) => new DiscordPlayerQueryResultCache(item, 0));
        return res;
    }
    async resolve(context) {
        const player = useMainPlayer();
        try {
            const key = this.createKey(context.query);
            const serialized = await this.redis.get(key);
            if (!serialized)
                throw new Error("No data found");
            const raw = JSON.parse(serialized);
            const parsed = Array.isArray(raw)
                ? raw.map((item) => deserialize(player, item))
                : deserialize(player, raw);
            return new SearchResult(player, {
                query: context.query,
                extractor: Array.isArray(parsed)
                    ? parsed[0].extractor
                    : parsed?.tracks[0].extractor,
                tracks: Array.isArray(parsed) ? parsed : parsed.tracks,
                requestedBy: context.requestedBy,
                playlist: Array.isArray(parsed) ? null : parsed,
                queryType: context.queryType,
            });
        }
        catch {
            return new SearchResult(player, {
                query: context.query,
                extractor: null,
                tracks: [],
                requestedBy: context.requestedBy,
                playlist: null,
                queryType: context.queryType,
            });
        }
    }
}
