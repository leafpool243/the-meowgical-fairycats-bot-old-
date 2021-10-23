function hi(interaction) {
        interaction.reply(`Hi there, ${interaction.member.nick || interaction.user.username}! :3`);
};

export { hi as default };