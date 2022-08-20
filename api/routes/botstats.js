const { request, response } = require(`express`);
const client = require(`../../app`);

module.exports = [{
    path: `/botstats`,
    method: `get`,
    authentication: true,

    /**
     * @param {request} req 
     * @param {response} res 
     */
    run: async (req, res) => {
        const { uptime, user } = client;

        return res.status(200).send({
            status: 200,
            message: `OK`,
            content: {
                uptime,
                user,
            },
        });
    },
}];