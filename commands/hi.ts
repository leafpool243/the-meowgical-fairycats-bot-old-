import { ICommand } from "wokcommands";

export default {
    category: "No category",
    description: "Say hi to the bot!! :3",

    slash: "both",
    testOnly: false,

    callback: ({}) => {
        return "haiiiii!! :3";
    }
} as ICommand;