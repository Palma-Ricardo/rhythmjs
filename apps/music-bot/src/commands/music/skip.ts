import { EmbedGenerator } from "#bot/utils/EmbedGenerator";
import type { CommandData, SlashCommandProps } from "commandkit";
import { useQueue, useTimeline } from "discord-player";

export const data: CommandData = {
  name: "skip",
  description: "Skip to the next track",
};

export async function run({ interaction }: SlashCommandProps) {
  if (!interaction.inCachedGuild()) return;

  await interaction.deferReply();

  const queue = useQueue(interaction.guildId);

  if (!queue?.isPlaying()) {
    const embed = EmbedGenerator.Error({
      title: "Not playing",
      description: "No track is playing right now",
    }).withAuthor(interaction.user);

    return interaction.editReply({ embeds: [embed] });
  }

  queue.node.skip();

  const embed = EmbedGenerator.Success({
    title: "Track skipped!",
    description: "Successfully skipped to the next track.",
  }).withAuthor(interaction.user);

  return interaction.editReply({ embeds: [embed] });
}
