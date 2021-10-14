/*
    Invite link:
    https://discord.com/api/oauth2/authorize?client_id=869317372161429554&permissions=36507307072&scope=bot%20applications.commands

    For reference:
    https://www.youtube.com/playlist?list=PLaxxQQak6D_f4Z5DtQo0b1McgjLVHmE8Q

    Deleting duplicate commands:
    https://stackoverflow.com/questions/69096016/fetching-and-deleting-all-slash-commands-in-discord-js-v13

    Libraries to install:
    path wokcommands dotenv discord.js nodemon
*/

import DiscordJS, { ApplicationCommandPermissionsManager, Intents } from 'discord.js';
import dotenv from 'dotenv';
import WOKCommands from 'wokcommands';
import path from 'path';
dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

client.login(process.env.TOKEN);

client.on('ready', async () => {
    console.log("Bot is online!");

    // const guildid = "896196282589261854"
    // const guild = client.guilds.cache.get(guildid);

    // let commands
    //if (guild) {
    //     commands = guild.commands
    // } else {
    // commands = client.application?.commands;
    // }

    // commands?.create({
    //     name: "embed",
    //     description: "Creates a embed.",
    // });

    // if (guild != undefined) {
    //     guild.commands.set([]);
    // }

    // if (client.application != null) {
    //     client.application.commands.set([]);
    // }

    // new WOKCommands(client, {
    //     commandsDir: path.join(__dirname, "commands"),
    //     testServers: ["896196282589261854", "768325434185351199", "811719657751969833"],
    //     botOwners: "758741446638567434",
    // })
    //     .setDefaultPrefix("m!")

    //     .setCategorySettings([
    //         {
    //             name: 'Testing',
    //             emoji: '🔧'
    //         }
    //     ]);



    // if (client.application) {
    //     const commandslist = client.application.commands.cache.toJSON();
    //     console.log(commandslist);
    // }

    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    const { token } = require('./config.json');
    const fs = require('fs');

    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    const clientId = '869317372161429554';

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();

    /* Respond to slash commands */

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        console.log(interaction);

        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
        }
    });


});