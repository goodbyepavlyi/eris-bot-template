const { Client, Message } = require(`eris`);
const reportError = require(`../utils/errorReporting.js`);
const { log } = require(`../utils/logger.js`);
const { GUILD_ONLY } = require(`../assets/messages.js`);
const InteractionType = require(`../enums/InteractionType.js`);
const { sendMessage } = require(`../utils/command.js`);

module.exports = {
    name: `messageCreate`,

    /**
     * @param {Client} client 
     * @param {Message} message 
     */
    async run(client, message) {
        const { content, author, guildID } = message;

        if (author.bot) return;

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${client.prefix})\\s*`);
        const prefix = content.match(prefixRegex);
        if (!prefix) return;

        const arguments = content.replace(prefixRegex, ``).trim().split(/ +/g);
        const commandName = arguments.shift().toLowerCase() || `help`;

        const command = client.interactions[InteractionType.COMMAND].find(command => command?.data?.name == commandName);
        if (!command) return;

        try {
            log(`User Action`, `'${author.username}#${author.discriminator}' (${author.id}) executed command '${commandName}'`, `magenta`);

            if (command.guildOnly && !guildID) return sendMessage(message, { embeds: [GUILD_ONLY] });

            return await command.runMessage(client, message, arguments);
        } catch (error) {
            const response = await reportError(author, error, `Message Command`, commandName);
            return sendMessage(message, response);
        }
    },
};
