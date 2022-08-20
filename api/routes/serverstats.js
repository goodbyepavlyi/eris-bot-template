const { request, response } = require(`express`);
const systeminformation = require(`systeminformation`);

module.exports = [{
    path: `/serverstats`,
    method: `get`,
    authentication: true,

    /**
     * @param {request} req 
     * @param {response} res 
     */
    run: async (req, res) => {
        const cpu = await systeminformation.cpu().then(({ speed, cores }) => ({ speed, cores }));
        const memory = await systeminformation.mem().then(({ total, free, used }) => ({ total, free, used }));
        const os = await systeminformation.osInfo().then(({ platform, distro, release, arch }) => ({ platform, distro, release, arch }));
        const load = await systeminformation.currentLoad().then(({ currentLoad: cpuLoad }) => ({ cpuLoad }));

        return res.status(200).send({
            status: 200,
            message: `OK`,
            content: {
                cpu,
                memory,
                os,
                load,
            },
        });
    },
}];