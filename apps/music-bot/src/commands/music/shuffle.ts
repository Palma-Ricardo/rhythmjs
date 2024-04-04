import { EmbedGenerator } from "#bot/utils/EmbedGenerator";
import type { CommandData, SlashCommandProps } from "commandkit";
import { useQueue } from "discord-player";

export const data: CommandData = {
    name: "shuffle",
    description: "Toggle shuffling the queue",
};

export async function run({interaction}: SlashCommandProps) {
    if (!interaction.inCachedGuild()) return;

    await interaction.deferReply();

    const queue = useQueue(interaction.guildId);

    if (!queue?.isPlaying()) {
        const embed = EmbedGenerator.Error({
            title: "Not playing",
            description: "No track is playing right now",
        }).withAuthor(interaction.user);

        return interaction.editReply({embeds: [embed]});
    }

    queue.toggleShuffle();

    const state = queue.isShuffling;

    const embed = EmbedGenerator.Success({
        title: `${state ? 'Enabled' : 'Disabled'} shuffling!`,
        description: `Shuffling was ${state ? 'enabled' : 'disabled'} by ${interaction.user.displayName} (<@${interaction.user.id}>).`,
    })

    await interaction.editReply({embeds: [embed] });
}
