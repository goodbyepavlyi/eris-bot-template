const path = require(`path`);
const { readdirSync, statSync } = require(`fs`);

function walk(dir) {
    const results = [];

    readdirSync(dir).forEach(directoryItem => {
        const stat = statSync(path.join(dir, directoryItem));

        if (stat.isFile()) return results.push(path.join(dir, directoryItem));
        if (stat.isDirectory()) walk(path.join(dir, directoryItem)).forEach(walkItem => results.push(walkItem));
    });

    return results;
};

module.exports = {
    walk,
};