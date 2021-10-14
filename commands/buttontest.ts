import { ButtonInteraction, Interaction, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Testing",
    description: "Reply with button test.",

    slash: "both",
    testOnly: false,

    callback: async ({ interaction: msgInt, channel }) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("button_yes")
                    .setLabel("Yes")
                    .setEmoji("✔")
                    .setStyle("SUCCESS")
            )
            .addComponents(
                new MessageButton()
                    .setCustomId("button_no")
                    .setLabel("No")
                    .setEmoji("✖")
                    .setStyle("DANGER")
            );
            
        const link = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL("https://google.com")
                    .setLabel("test link to google")
                    .setStyle("LINK")
            );

        await msgInt.reply({
            content: "**Example question**\nAre you sure you wish to continue? (*Yes* or *No*)\n\nYou have 15 seconds.",
            components: [row, link],
        });

        const filter = (btnInt: ButtonInteraction) => {
            return msgInt.user.id === btnInt.user.id;
        };


        const collector = channel.createMessageComponentCollector({
            max: 1,
            time: 1000 * 15,
        });

        collector.on("collect", (i: ButtonInteraction) => {
            if (i.customId === "button_yes") {
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId("button_yes")
                            .setLabel("Yes")
                            .setEmoji("✔")
                            .setStyle("SUCCESS")
                            .setDisabled(true)
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId("button_no")
                            .setLabel("No")
                            .setEmoji("✖")
                            .setStyle("DANGER")
                            .setDisabled(true)
                    );

                msgInt.editReply({
                    content: "*An action has already been taken.*",
                    components: [row, link],
                });

                i.reply({
                    content: "You selected “yes”.",
                });
            } else if (i.customId === "button_no") {
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId("button_yes")
                            .setLabel("Yes")
                            .setEmoji("✔")
                            .setStyle("SUCCESS")
                            .setDisabled(true)
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId("button_no")
                            .setLabel("No")
                            .setEmoji("✖")
                            .setStyle("DANGER")
                            .setDisabled(true)
                    );

                msgInt.editReply({
                    content: "*An action has already been taken.*",
                    components: [row, link],
                });

                msgInt.followUp({
                    content: "You selected “no”.",
                });
            }
        });
    },
} as ICommand;