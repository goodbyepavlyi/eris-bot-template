const client = require(`../app`);

/**
 * @returns {number} A color
 */
const resolveColor = (color) => parseInt(color.replace('#', ''), 16);

module.exports = {
    GUILD_ONLY: {
        color: resolveColor(client.accentColor),
        title: `Sorry, but this command can only be used in servers.`,
    },

    /**
     * 
     * @param {number} errorId The Error ID
     * @returns {object} Discord Embed object
     */
    ERROR: (errorId) => ({
        color: resolveColor(client.accentColor),
        title: `Error #${errorId}`,
        description: `During the processing of this action, an error occurred. It would be appreciated if you would report this error on our Github page.`,
        url: `${client.repositoryUrl}/issues/new?template=bug_report.md`,
    }),

    /**
     * 
     * @param {number} errorId The Error ID
     * @param {number} executorId ID of the executor
     * @param {string} executorUsername Username of the executor
     * @param {string} executorAvatar URL of the executor's avatar
     * @param {string} actionType The Action Type
     * @param {string} actionName The Action Name
     * @returns {object} Discord Embed object
     */
    ERROR_REPORT: (errorId, executorId, executorUsername, executorAvatar, actionType, actionName) => ({
        color: resolveColor(client.accentColor),
        title: `Error #${errorId}`,
        author: {
            name: `${executorUsername} (${executorId})`,
            icon_url: executorAvatar,
        },
        fields: [
            {
                name: `Action`,
                value: actionType,
            },
            {
                name: `Name`,
                value: actionName,
            },
        ],
        timestamp: (new Date().getTime()),
    }),

    PING: `Pong!`,
    PING_BUTTONS: {
        type: 1,
        components: [
            {
                type: 2,
                style: 1,
                emoji: {
                    name: `🏓`,
                },
                custom_id: `ping`,
            },
        ],
    },
};