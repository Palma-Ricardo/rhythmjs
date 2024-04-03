import { EmbedGenerator } from "#bot/utils/EmbedGenerator";
import { useTimeline } from "discord-player";
import { ApplicationCommandOptionType } from "discord.js";
export const data = {
    name: "volume",
    description: "Get or manipulate the volume",
    options: [
        {
            name: "value",
            description: "The volume to set",
            min_value: 0,
            max_value: 100,
            type: ApplicationCommandOptionType.Integer,
            required: false,
        },
    ],
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
    const amount = interaction.options.getInteger("value", false);
    if (amount != null) {
        timeline.setVolume(amount);
        const embed = EmbedGenerator.Success({
            title: "Volume changed",
            description: `Successfully changed the volume to ${amount}%.`,
        }).withAuthor(interaction.user);
        return interaction.editReply({ embeds: [embed] });
    }
    const embed = EmbedGenerator.Success({
        title: "Volume",
        description: `The current volume is \`${timeline.volume}%\`.`,
    }).withAuthor(interaction.user);
    return interaction.editReply({ embeds: [embed] });
}
