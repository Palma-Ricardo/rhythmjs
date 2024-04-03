import { EmbedGenerator } from "#bot/utils/EmbedGenerator";
import { useQueue } from "discord-player";
export const data = {
    name: "leave",
    description: "Disconnect the bot",
};
export async function run({ interaction }) {
    if (!interaction.inCachedGuild())
        return;
    await interaction.deferReply();
    const queue = useQueue(interaction.guildId);
    if (!queue) {
        const embed = EmbedGenerator.Error({
            title: "Not playing",
            description: "No track is playing right now",
        }).withAuthor(interaction.user);
        return interaction.editReply({ embeds: [embed] });
    }
    queue.delete();
    const embed = EmbedGenerator.Success({
        title: "Disconnected!",
        description: "Successfully left the voice channel.",
    }).withAuthor(interaction.user);
    return interaction.editReply({ embeds: [embed] });
}
