import { EmbedGenerator } from "#bot/utils/EmbedGenerator";
import { useTimeline } from "discord-player";
export const data = {
    name: "pause",
    description: "Pause the current song",
};
export async function run({ interaction }) {
    if (!interaction.inCachedGuild())
        return;
    await interaction.deferReply();
    const timeline = useTimeline(interaction.guildId);
    if (!timeline?.track) {
        const embed = EmbedGenerator.Error({
            title: "Not playing",
            description: "No track is playing right now",
        }).withAuthor(interaction.user);
        return interaction.editReply({ embeds: [embed] });
    }
    if (timeline.paused) {
        const embed = EmbedGenerator.Error({
            title: "Error",
            description: "The track is already paused",
        }).withAuthor(interaction.user);
        return interaction.editReply({ embeds: [embed] });
    }
    timeline.pause();
    const embed = EmbedGenerator.Success({
        title: "Paused",
        description: "Successfully paused the track.",
    }).withAuthor(interaction.user);
    return interaction.editReply({ embeds: [embed] });
}
