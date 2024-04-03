import { EmbedGenerator } from "#bot/utils/EmbedGenerator";
import { useTimeline } from "discord-player";
export const data = {
    name: "resume",
    description: "Resume the current song",
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
    if (!timeline.paused) {
        const embed = EmbedGenerator.Error({
            title: "Error",
            description: "The track is not paused",
        }).withAuthor(interaction.user);
        return interaction.editReply({ embeds: [embed] });
    }
    timeline.resume();
    const embed = EmbedGenerator.Success({
        title: "Resumed",
        description: "Successfully resumed the track.",
    }).withAuthor(interaction.user);
    return interaction.editReply({ embeds: [embed] });
}
