const Event = require("../structures/event.js");

module.exports = new Event("ready", client => {
	console.log("Bot is ready!");
    client.user.setActivity("with ur mom!");
});