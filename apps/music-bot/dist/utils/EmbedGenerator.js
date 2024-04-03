import { EmbedBuilder } from "discord.js";
import { EmbedColor } from "./constants.js";
import { useClient } from "#bot/hooks/useClient";
export class EmbedGenerator extends EmbedBuilder {
    static Error(data) {
        return EmbedGenerator.create(data).setColor(EmbedColor.Error);
    }
    static Success(data) {
        return EmbedGenerator.create(data).setColor(EmbedColor.Success);
    }
    static Warning(data) {
        return EmbedGenerator.create(data).setColor(EmbedColor.Warning);
    }
    static Info(data) {
        return EmbedGenerator.create(data).setColor(EmbedColor.Info);
    }
    static create(data) {
        const client = useClient();
        return new EmbedGenerator(data).setClient(client);
    }
    client = null;
    setClient(client) {
        this.client = client;
        return this;
    }
    withAuthor(user) {
        if (!this.client)
            return this;
        const author = this.client.users.resolve(user);
        if (!author)
            return this;
        return this.setAuthor({
            name: author.username,
            iconURL: author.displayAvatarURL(),
        });
    }
}
