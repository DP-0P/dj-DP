const Command = require("../structures/command.js");

module.exports = new Command({
	name: "hello",
	description: "Hello!",

	async run(message, args, client) {
		message.reply("Hello!");
	}
});