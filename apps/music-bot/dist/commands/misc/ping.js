export const data = {
    name: "ping",
    description: "Displays the latency from the bot to Discord",
};
export async function run({ interaction, client }) {
    const clientLatency = client.ws.ping.toFixed(0);
    const sent = await interaction.reply({
        content: "Pinging...",
        fetchReply: true,
    });
    interaction.editReply(`Ping: ${sent.createdTimestamp - interaction.createdTimestamp}ms | Websocket: ${clientLatency}ms`);
}
