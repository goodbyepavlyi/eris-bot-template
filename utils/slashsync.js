const { Client } = require(`eris`);
const InteractionType = require(`../enums/InteractionType`);
const { log } = require(`./logger`);

/**
 * @param {Client} client 
 */
module.exports = (client) => new Promise(async (resolve, reject) => {
    const commands = client.interactions[InteractionType.COMMAND].map(({ data }) => {
        const { name, description, type, options } = data;
        return { name, description: description.split(`\n`)[0].substring(0, 100), type, options };
    });

    try {
        for (const command of commands) {
            await client.createGuildCommand(client.testGuildId, command);
            await client.createCommand(command);
        }

        log(`Discord`, `Successfully synchronized application commands!`, `blue`);
        resolve();
    } catch (error) {
        log(`Discord`, `While synchronizing the application commands, an error occured!`, `blue`);
        reject(error);
    }
});
