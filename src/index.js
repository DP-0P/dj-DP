const Client = require("./structures/client.js");

const Command = require("./structures/command.js");

const config = require("./Data/config.json");

const client = new Client();

const fs = require("fs");

fs.readdirSync("./src/commands")
    .filter(file => file.endsWith(".js")).
    forEach(file => {
    /**
     * @type {Command}
     */
    const command = require(`./commands/${file}`);
    console.log(`Command ${command.name} loaded...`);
    client.commands.set(command.name,command);

});

client.on("ready",() => {
    console.log("Bot is online...");
    client.user.setActivity("with ur mom!");
});

client.on("messageCreate",message =>{
    console.log(message.content);

    // if(message.content == "hello") message.reply("sup??");

    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0]);

    if(!command) return message.reply (`${args[0]} is not a valid command...`);

    command.run(message,args,client);

});

client.login(config.token);