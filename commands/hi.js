function hi(interaction) {
    interaction.reply(`Hi there, ${interaction.member.nickname || interaction.user.username}! :3`);
};

export { hi as default };