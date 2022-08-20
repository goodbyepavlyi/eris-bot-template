const { CommandInteraction, Message, ComponentInteraction } = require(`eris`);
const client = require(`../app`);

/**
 * @returns {boolean}
 */
const isMessage = (source) => source instanceof Message;

/**
 * @returns {boolean}
 */
const isInteraction = (source) => source instanceof CommandInteraction || source instanceof ComponentInteraction;

module.exports = {
    /**
     * @param {ComponentInteraction | CommandInteraction | Message} source 
     * @param {object} response 
     * @returns {Promise<Message | undefined>}
     */
    sendMessage: (source, response) => new Promise((resolve, reject) => {
        if (isMessage(source)) return resolve(client.createMessage(source.channel.id, response));
        if (isInteraction(source)) return resolve(source.createMessage(response));

        return reject(Error(`UNKNOWN_INTERACTION`))
    }),
};