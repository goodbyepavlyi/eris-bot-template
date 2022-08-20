const { Client, Collection } = require(`eris`);
const path = require(`path`);
const { walk } = require(`../utils/filesystem.js`);

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    const files = walk(path.join(__dirname, `../interactions`)).filter(file => file.endsWith(`.js`));

    for (const file of files) {
        const interaction = require(file);

        const type = interaction.type;
        if (!type) return;

        const id = interaction?.data?.name || interaction?.data?.id;
        (client.interactions[type] ??= new Collection()).set(id, interaction);
    }
};