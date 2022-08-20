const { ComponentInteraction } = require(`eris`);
const InteractionType = require(`../enums/InteractionType.js`);
const { sendMessage } = require(`../utils/command.js`);
const reportError = require(`../utils/errorReporting.js`);
const { log } = require(`../utils/logger.js`);

module.exports = {
    name: `interactionCreate`,

    /**
     * @param {ComponentInteraction} interaction 
     */
    async run(client, interaction) {
        if (!(interaction instanceof ComponentInteraction)) return;

        const { data } = interaction;
        const user = interaction?.user || interaction?.member?.user;
        if (user.bot) return;

        const button = client.interactions[InteractionType.BUTTON].find(button => button?.data?.id == data.custom_id && button?.data?.component_type == data.component_type);
        if (!button) return;

        try {
            log(`User Action`, `'${user.username}#${user.discriminator}' (${user.id}) used button '${data.custom_id}'`, `magenta`);
            
            await button.run(client, interaction);
        } catch (error) {
            const response = await reportError(user, error, `Button Interaction`, data.custom_id);
            return sendMessage(interaction, response);
		}
    },
};