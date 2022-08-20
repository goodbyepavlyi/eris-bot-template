const { Client, AutocompleteInteraction, CommandInteraction, Message } = require(`eris`);
const { PING, PING_BUTTONS } = require(`../../assets/messages.js`);
const { sendMessage } = require(`../../utils/command.js`);
const InteractionType = require(`../../enums/InteractionType`);
const CommandType = require(`../../enums/CommandType`);

module.exports = {
    type: InteractionType.COMMAND,
    data: {
        name: `ping`,
        description: `Pong!`,
        type: CommandType.CHAT_INPUT,
        options: [],
    },

    id: `general`,

    /**
     * @param {Client} client 
     * @param {AutocompleteInteraction} interaction 
     */
    async autocomplete(client, interaction) {
        const choices = [];
        return choices;
    },

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async runInteraction(client, interaction) {
        await this.run(interaction, client);
    },
    
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} arguments 
     */
    async runMessage(client, message, arguments) {
        await this.run(message, client);
    },

    /**
     * @param {CommandInteraction | Message} source 
     * @param {Client} client 
     */
	async run(source, client) {
		return sendMessage(source, { content: PING, components: [PING_BUTTONS] });
	},
};