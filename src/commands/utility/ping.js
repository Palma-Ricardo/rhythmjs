const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Displays the latency from the bot to Discord'),
    async execute(interaction) {
        let sent = await interaction.reply({content: 'Pinging...', fetchReply: true});
        await interaction.editReply(`Ping: ${sent.createdTimestamp - interaction.createdTimestamp
            }ms | Websocket: ${interaction.client.ws.ping}ms`);
    },
};
