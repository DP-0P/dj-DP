const {GuildMember} = require('discord.js');

module.exports = {
  name: 'dc',
  description: 'Disconnects the bot from the channel.',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: "🤦🏻‍♂️ U are't in a voice channel.",
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: "Bruh! We aren't in the same voice channel...",
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });
    queue.destroy();
    return void interaction.followUp({content: 'Leaving the voice channel... Bye...🤧👋🏻👋🏻'});
  },
};