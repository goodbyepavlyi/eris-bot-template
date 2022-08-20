const { Client, ComponentInteraction } = require(`eris`);
const { PING } = require(`../../assets/messages.js`);
const { sendMessage } = require(`../../utils/command.js`);
const InteractionType = require(`../../enums/InteractionType`);

module.exports = {
    type: InteractionType.BUTTON,
    data: {
        id: `ping`,
        component_type: 2
    },

    /**
     * @param {Client} client 
     * @param {ComponentInteraction} interaction
     */
	async run(client, interaction) {
		return sendMessage(interaction, { content: PING });
	},
};