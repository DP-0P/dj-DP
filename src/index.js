const Client = require("./structures/client.js");

const config = require("./data/config.json");

const client = new Client();

client.start(config.token);