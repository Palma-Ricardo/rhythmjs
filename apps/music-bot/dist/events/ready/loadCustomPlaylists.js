import { useDatabase } from "#bot/hooks/useDatabase";
import { useRedis } from "#bot/hooks/useRedis";
export default async function loadCustomPlaylistsCache(client) {
    const db = useDatabase();
    const redis = useRedis();
    const playlists = await db.playlist.find({
        private: false,
        unlisted: false,
    });
    if (!playlists.length)
        return;
    const resolvedList = new Map();
    await Promise.all(playlists.map(async (list) => {
        const user = await client.users
            .fetch(list.author)
            .then((u) => u.displayName)
            .catch(() => list.author);
        resolvedList.set(`discord-player:custom-playlist:${list.id}`, JSON.stringify({
            id: list.id,
            name: list.name,
            author: user,
            url: `playlist:${list.id}`,
            trackCount: list.tracks.length,
        }));
    }));
    await redis.mset(resolvedList);
}
