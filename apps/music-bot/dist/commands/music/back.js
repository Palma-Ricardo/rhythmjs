import { EmbedGenerator } from "#bot/utils/EmbedGenerator";
import { useHistory } from "discord-player";
export const data = {
    name: "back",
    description: "Back to the previous track",
};
export async function run({ interaction }) {
    if (!interaction.inCachedGuild())
        return;
    await interaction.deferReply();
    const history = useHistory(interaction.guildId);
    if (!history) {
        const embed = EmbedGenerator.Error({
            title: "Not playing",
            description: "No track is playing right now",
        }).withAuthor(interaction.user);
        return interaction.editReply({ embeds: [embed] });
    }
    if (history.isEmpty()) {
        const embed = EmbedGenerator.Error({
            title: "No previous track",
            description: "There is no previous track to go back to",
        }).withAuthor(interaction.user);
        return interaction.editReply({ embeds: [embed] });
    }
    await history.back();
    const embed = EmbedGenerator.Success({
        title: "Track skipped!",
        description: "Successfully skipped to the previous track.",
    }).withAuthor(interaction.user);
    return interaction.editReply({ embeds: [embed] });
}
