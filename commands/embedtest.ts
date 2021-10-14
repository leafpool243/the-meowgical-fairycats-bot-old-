import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Testing",
    description: "Creates a embed.",

    slash: "both",
    testOnly: false,

    callback: ({}) => {
        const embed = new MessageEmbed()
            .setDescription("hello")
            .setTitle("title");
        
        return embed;
    }
} as ICommand;