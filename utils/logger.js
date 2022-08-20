const chalk = require(`chalk`);
let interval;

module.exports = {
    start: (type, text, color) => {
        if (!type) throw new TypeError(`'Type' is undefined`);
        if (!text) throw new TypeError(`'Text' is undefined`);

        const chars = [`| `, `/ `, `- `, `\\ `];
        let i = 0;

        if (!(color && chalk[`${color}Bright`])) textColor = `white`;
        else textColor = `${color}Bright`;

        interval = setInterval(() => {
            process.stdout.write(`\r` + chalk.gray(chars[i]) + chalk[color || `grey`](`[${type}] `) + chalk[color || `grey`](text));
            i++;
            if (i == chars.length) i = 0;
        }, 100);
    },

    end: (type, text, color) => {
        if (!type) throw new TypeError(`'Type' is undefined`);
        if (!text) throw new TypeError(`'Text' is undefined`);

        if (!(color && chalk[`${color}Bright`])) textColor = `white`;
        else textColor = `${color}Bright`;

        clearInterval(interval);
        console.log(`\n` + chalk[color || `grey`](`[${type}] `) + chalk[textColor](text));
    },

    log: (type, text, color) => {
        if (!type) throw new TypeError(`'Type' is undefined`);
        if (!text) throw new TypeError(`'Text' is undefined`);

        if (!(color && chalk[`${color}Bright`])) textColor = `white`;
        else textColor = `${color}Bright`;

        console.log(chalk[color || `grey`](`[${type}] `) + chalk[textColor](text));
    },
};