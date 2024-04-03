import { Schema, SchemaTypes, model } from "mongoose";
export const PlaylistSchema = new Schema({
    id: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
        default: () => crypto.randomUUID(),
    },
    author: {
        type: SchemaTypes.String,
        required: true,
    },
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    private: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    unlisted: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    tracks: {
        type: [SchemaTypes.Mixed],
        default: [],
    },
}, {
    timestamps: true,
});
export const PlaylistModel = model("Playlist", PlaylistSchema);
