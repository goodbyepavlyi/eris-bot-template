const { Client } = require(`eris`);
const { readdirSync } = require(`fs`);

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    const events = readdirSync(`./events`).filter(file => file.endsWith(`.js`));

    for (const file of events) {
        const event = require(`../events/${file}`);
        const argumentsFunction = (...args) => event.run(client, ...args);

        event.once ? client.once(event.name, argumentsFunction) : client.on(event.name, argumentsFunction);
    };
};