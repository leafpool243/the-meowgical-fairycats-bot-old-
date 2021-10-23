/*
    Invite link:
    https://discord.com/api/oauth2/authorize?client_id=869317372161429554&permissions=36507307072&scope=bot%20applications.commands

    For reference:
    https://www.youtube.com/playlist?list=PLaxxQQak6D_f4Z5DtQo0b1McgjLVHmE8Q

    Deleting duplicate commands:
    https://stackoverflow.com/questions/69096016/fetching-and-deleting-all-slash-commands-in-discord-js-v13

    Libraries to install:
    path /wokcommands /dotenv discord.js nodemon
*/

import { createRequire } from "module";
const require = createRequire(import.meta.url);
import DiscordJS, { ApplicationCommandPermissionsManager, Intents } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
const { token } = require('./config.json');

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

client.login(token);

client.on('ready', async () => {
    console.log("Bot is online!");

    // const guildid = "896196282589261854";
    // const guild = client.guilds.cache.get(guildid);

    // if (guild) {
    //     guild.commands.set([]);
    //     console.log("done.");
    // }

    // if (client.application) {
    //     client.application.commands.set([]);
    //     console.log("Done.")
    // }

    /* Respond to slash commands */

    client.on("interactionCreate", async interaction => {
        if (!interaction.isCommand()) return;
        console.log(interaction);

        if (interaction.commandName === "ping") {
            await interaction.reply("Pong!");
        } else if (interaction.commandName === "hi") {
            await interaction.reply(`Hey there, ${interaction.member.nickname}! :3`);
        } else if (interaction.commandName === "你好") {
            await interaction.reply(`${interaction.member.nickname} 你好！`)
        }
    });


});