require('dotenv').config();
const fs = require("fs");
const Discord = require("discord.js");
const Client = require("./client/Client");
// const config = require("./config.json");
const { Player } = require("discord-player");
const { MessageEmbed } = require('discord.js');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const player = new Player(client);

player.on("error", (queue, error) => {
  console.log(
    `[${queue.guild.name}] Error emitted from the queue: ${error.message}`
  );
});

player.on("connectionError", (queue, error) => {
  console.log(
    `[${queue.guild.name}] Error emitted from the connection: ${error.message}`
  );
});

player.on("trackStart", (queue, track) => {
  queue.metadata.send(`Started playing **${track.title}**`);
});

player.on("trackAdd", (queue, track) => {
  queue.metadata.send(`**${track.title}** queued!`);
});

player.on("botDisconnect", (queue) => {
  queue.metadata.send("Someone disconnected me from the channel 🤧🤧");
});

player.on("channelEmpty", (queue) => {
  queue.metadata.send("Nobody is in the voice channel, leaving... Bye...");
});

client.once("ready", async () => {
  console.log("Ready!");
});

client.on("ready", function () {
  client.user.setActivity("with loneliness!");
});

client.on("messageCreate", async message => {
  if (message.author.bot || !message.guild) return;

  if(message.content == '/help'){
    const embed = new MessageEmbed()
	.setColor('#7200fc')
	.setTitle('Available Commands')
	.addFields(
		{ name: '**/play** <song name or link>', value: 'Plays the specified song' },
		{ name: '**/pause**', value: 'Pause the currently played song' },
		{ name: '**/resume**', value: 'Resumes the paused song' },
		{ name: '**/skip**', value: 'Skips to the next song' },
		{ name: '**/dc**', value: 'Disconnects the bot from the channel' },  
		{ name: '**/help**', value: 'Shows all the available commands' },  
	)
	.setFooter('Made by DP🖤');
message.reply({ embeds: [embed] });
  }

  message.guild.commands.set(client.commands).then(() => {
    console.log("Added");
  });
});

client.on("interactionCreate", async interaction => {
  const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    if (interaction.commandName == "help"
    ) {
      command.execute(interaction, client);
    } else {
      command.execute(interaction, player);
    }
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: "There was an error trying to execute that command!",
    });
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
