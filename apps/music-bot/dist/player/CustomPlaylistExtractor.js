import { useDatabase } from "#bot/hooks/useDatabase";
import { BaseExtractor, deserialize, } from "discord-player";
export class CustomPlaylistExtractor extends BaseExtractor {
    db = null;
    static identifier = "custom-playlist-extractor";
    async activate() {
        this.db = useDatabase();
        this.protocols = ["playlist"];
    }
    async deactivate() {
        this.db = null;
        this.protocols = [];
    }
    async validate(query, type) {
        const regex = new RegExp(`/^(${this.protocols.join("|")}:)?[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/`);
        return regex.test(query);
    }
    async handle(query, context) {
        if (!this.db)
            return this.createResponse();
        const id = query.startsWith("playlist:")
            ? query.split("playlist:")[1]
            : query;
        const result = await this.db.playlist.findOne({
            id,
        });
        if (!result ||
            (result.author !== context.requestedBy?.id && result.private))
            return this.createResponse();
        const playlist = this.context.player.createPlaylist({
            author: {
                name: this.context.player.client.users.resolve(result.author)
                    ?.displayName ?? result.author,
                url: "",
            },
            description: "",
            id: result.id,
            source: "arbitrary",
            thumbnail: "",
            title: result.name,
            tracks: [],
            type: "playlist",
            url: "",
        });
        const tracks = result.tracks.map((track) => {
            const song = deserialize(this.context.player, track);
            song.playlist = playlist;
            return song;
        });
        playlist.tracks = tracks;
        return this.createResponse(playlist, tracks);
    }
}
