const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('buttontest').setDescription('Replies with button test.'),
	new SlashCommandBuilder().setName('embedtest').setDescription('Creates an embed.'),
	new SlashCommandBuilder().setName('hi').setDescription('Say hi to the bot!! :3'),
	new SlashCommandBuilder().setName('pingtest').setDescription('Ping pong!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(
    Routes.applicationCommands(clientId),
    { body: commands },
)
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);