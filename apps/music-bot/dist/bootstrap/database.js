import mongoose from "mongoose";
import { HooksRegistry, Symbols } from "#bot/hooks/registry";
import { GuildModel } from "./mongo/Guild.schema.js";
import { PlaylistModel } from "./mongo/Playlist.Schema.js";
const db = await mongoose.connect(process.env.DATABASE_URL, {
    user: process.env.DATABASE_USERNAME,
    pass: process.env.DATABASE_PASSWORD,
});
console.log("Connected to the database");
export class MongoDatabase {
    mongo;
    guild = GuildModel;
    playlist = PlaylistModel;
    constructor(mongo) {
        this.mongo = mongo;
    }
}
HooksRegistry.set(Symbols.kDatabase, new MongoDatabase(db));
export { db };
