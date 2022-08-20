const { CommandInteraction, Client } = require(`eris`);
const InteractionType = require(`../enums/InteractionType.js`);
const { GUILD_ONLY } = require(`../assets/messages.js`);
const reportError = require(`../utils/errorReporting.js`);
const { log } = require(`../utils/logger.js`);
const { sendMessage } = require(`../utils/command.js`);

module.exports = {
    name: `interactionCreate`,

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     */
    async run(client, interaction) {
        if (!(interaction instanceof CommandInteraction)) return;

        const { guildID, data } = interaction;
        const user = interaction?.user || interaction?.member?.user;
        if (user.bot) return;

        const commandName = data?.name;
        const command = client.interactions[InteractionType.COMMAND].find(command => command?.data?.name == commandName);
        if (!command) return;

        try {
            log(`User Action`, `'${user.username}#${user.discriminator}' (${user.id}) executed command '${commandName}'`, `magenta`);

            if (command.guildOnly && !guildID) return sendMessage(interaction, { embeds: [GUILD_ONLY] });

            return await command.runInteraction(client, interaction);
        } catch (error) {
            const response = await reportError(user, error, `Interaction Command`, commandName);
            return sendMessage(interaction, response);
        }
    },
};