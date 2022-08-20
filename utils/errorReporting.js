const { User, Message } = require(`eris`);
const client = require(`../app.js`);
const { ERROR, ERROR_REPORT } = require(`../assets/messages.js`);
const { log } = require(`./logger`);

/**
 * @param {User} executor The executor of the action
 * @param {Error} error The Error object
 * @param {string} actionType The action type
 * @param {string} actionName The action name
 * @param {boolean} reportError [reportError=true] If the error should be reported
 * @returns {Promise<object>} Returns the error embed
 */
function createEmbed(executor, error, actionType, actionName, reportError = true) {
    return new Promise(async (resolve) => {
        const errorId = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    
        log(`Error`, error.stack, `red`);
    
        if (reportError) await report(executor, error, errorId, actionType, actionName).catch((error) => log(`Error`, `Failed to report error to Discord Server! ${error.stack}`, `red`));
        resolve({ embeds: [ERROR(errorId)] });
    })
};

/**
 * @param {User} executor The executor of the action
 * @param {Error} error The Error object
 * @param {number} errorId The Error ID
 * @param {string} actionType The action type
 * @param {string} actionName The action name
 * @returns {Promise<Message>} Returns the error report Message
 */
function report(executor, error, errorId, actionType, actionName) {
    return new Promise(async (resolve) => {
        const channelId = client.supportServerChannels.botErrors;
        const reportEmbed = ERROR_REPORT(errorId, executor.id, `${executor.username}#${executor.discriminator}`, executor.avatarURL || executor.defaultAvatarURL, actionType, actionName);
        const file = Buffer.from(error.stack);

        resolve(client.createMessage(channelId, { embeds: [reportEmbed] }, { name: `stack.txt`, file }));
    })
};

module.exports = createEmbed;