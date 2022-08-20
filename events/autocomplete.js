const { AutocompleteInteraction, Client } = require(`eris`);
const InteractionType = require(`../enums/InteractionType`);

module.exports = {
    name: `interactionCreate`,

    /**
     * @param {Client} client 
     * @param {AutocompleteInteraction} interaction
     */
    async run(client, interaction) {
        if (!(interaction instanceof AutocompleteInteraction)) return;

        const { name,  options } = interaction.data;

        const command = client.interactions[InteractionType.COMMAND].get(name);
        if (!command) return;

        const choices = await command.autocomplete(client, interaction);
        const focused = options.find(option => option.focused);
		const filtered = choices.filter(choice => choice.toLowerCase().startsWith(focused.value.toLowerCase()));
        if (filtered.length > 25) filtered.splice(25);

		return interaction.result(filtered.map(choice => ({ name: choice, value: choice })));
    },
};
