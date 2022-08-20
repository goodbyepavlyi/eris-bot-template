const { Client } = require(`eris`);
const { AutoPoster } = require(`topgg-autoposter`);
const { end, log } = require(`../utils/logger.js`);
const slashsync = require(`../utils/slashsync.js`);

module.exports = {
    name: `ready`,
    once: true,

    /**
     * @param {Client} client 
     */
    async run(client) {
        end(`Discord`, `Successfully connected to Discord API! (${client.user.username}#${client.user.discriminator}) (${client.user.id})`, `blue`);

        client.editStatus(client.presenceStatus, {
            name: client.presenceName,
            type: client.presenceType,
        });

        const topgg = AutoPoster(client.topggToken, client);
        topgg.on(`posted`, () => log(`Top.GG`, `Posted bot statistics!`, `green`))
            .on(`error`, (error) => log(`Top.GG`, `Failed to post bot statistics! ${error.message}`, `red`));

        await slashsync(client);
    },
};
