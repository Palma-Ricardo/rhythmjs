const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song from query or URL')
        .addStringOption(option => 
            option
                .setName('query')
                .setDescription('The search terms or URL to use')
                .setRequired(true)
        ),
    async execute(interaction) {
        const player = useMainPlayer();
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply('You are not connected to a voice channel!');
        const query = interaction.options.getString('query', true);

        await interaction.deferReply();

        try {
            const {track} = await player.play(channel, query, {
                nodeOptions: {
                    metadata: interaction
                }
            });

            return interaction.followUp(`**${track.title}** added to queue!`);
        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`);
        }
    },
}
