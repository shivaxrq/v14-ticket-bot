const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const INTENTS = Object.values(GatewayIntentBits);
const client = new Client({ intents: INTENTS });
const config = require("./config.js");
const chalk = require('chalk');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { readdirSync } = require("fs");
const moment = require("moment");

let token = config.bot.token;

client.commands = new Collection();
client.slashcommands = new Collection();
client.commandaliases = new Collection();

const rest = new REST({ version: "10" }).setToken(token);

const log = (x) => {
    console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`);
};

const commands = [];
readdirSync("./commands").forEach(async (file) => {
    const command = await require(`./commands/${file}`);
    if (command) {
        client.commands.set(command.name, command);
        commands.push(command.name, command);
        if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach((alias) => {
                client.commandaliases.set(alias, command.name);
            });
        }
    }
});

const slashcommands = [];
readdirSync("./commands").forEach(async (file) => {
    const command = await require(`./commands/${file}`);
    slashcommands.push(command.data.toJSON());
    client.slashcommands.set(command.data.name, command);
    console.log(chalk.cyan("[+] " + command.data.name + " Yüklendi"));

});

client.on(Events.ClientReady, async () => {
    try {
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: slashcommands,
        });
    } catch (error) {
        console.error(error);
    }
    log(chalk.green(`${client.user.username} Aktif Edildi!`));
});


readdirSync("./events").forEach(async (file) => {
    const event = await require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

client.login(config.bot.token);