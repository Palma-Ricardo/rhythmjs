import type { CommandData, SlashCommandProps } from 'commandkit';

export const data: CommandData = {
    name: 'ping',
    description: 'Shows the latency between the bot and Discord.',
};

export async function run({ interaction, client }: SlashCommandProps) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const clientLatency = client.ws.ping.toFixed(0);

    interaction.editReply(`Ping: ${sent.createdTimestamp - interaction.createdTimestamp}ms | Websocket: ${clientLatency}ms`);
}
