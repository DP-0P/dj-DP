const {GuildMember} = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'Pause current song!',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: "**Plz** join a voice channel 🤦🏻‍♂️",
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: "**Buddy** we are't in the same channel",
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '**Bruh!** play a music to pause 🤦🏻‍♂️',
      });
    const success = queue.setPaused(true);
    return void interaction.followUp({
      content: success ? 'Paused!' : '',
    });
  },
};
