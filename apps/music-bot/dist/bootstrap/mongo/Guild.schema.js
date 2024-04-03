import { Schema, SchemaTypes, model } from "mongoose";
export const GuildSchema = new Schema({
    id: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    volume: {
        type: SchemaTypes.Number,
        default: 50,
        min: 0,
        max: 100,
    },
    equalizer: {
        type: [SchemaTypes.Number],
        default: Array.from({ length: 15 }, () => 0),
    },
    filters: {
        type: [SchemaTypes.String],
        default: [],
    },
    loopMode: {
        type: SchemaTypes.Number,
        default: 0,
        min: 0,
        max: 3,
    },
}, {
    timestamps: true,
});
export const GuildModel = model("Guild", GuildSchema);
