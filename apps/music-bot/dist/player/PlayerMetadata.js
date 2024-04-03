import { CommandInteraction, } from "discord.js";
export class PlayerMetadata {
    data;
    constructor(data) {
        this.data = data;
        if (data.channel.isDMBased()) {
            throw new Error("PlayerMetadata cannot be created from a DM");
        }
        if (!data.channel) {
            throw new Error("PlayerMetadata can only be created from a channel");
        }
    }
    get channel() {
        return this.data.channel;
    }
    get guild() {
        return this.data.guild || this.data.channel.guild;
    }
    static create(data) {
        if (data instanceof CommandInteraction) {
            if (!data.inGuild()) {
                throw new Error("PlayerMetadata cannot be created from a DM");
            }
            return new PlayerMetadata({ channel: data.channel, guild: data.guild });
        }
        return new PlayerMetadata(data);
    }
}
