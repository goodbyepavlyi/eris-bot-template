const { request, response } = require(`express`);
const client = require(`../../app`);

module.exports = [{
    path: `/goodbyepavlyi`,
    method: `get`,
    authentication: true,

    /**
     * @param {request} req 
     * @param {response} res 
     */
    run: async (req, res) => {
        const user = client.users.get(`755473025209466950`) || await client.getRESTUser(`755473025209466950`);
        const member = client.guilds.get(`888438384836612107`).members.get(`755473025209466950`) || await client.getRESTGuildMember(`888438384836612107`, `755473025209466950`);

        if (!(member?.user?.id || user?.id)) return res.status(500).json({
            status: 500,
            message: `Cannot fetch goodbyepavlyi.`
        }); 

        let color = `#747F8D`;
        switch (member.status) {
            case `online`: { color = `#57F287`; break; }
            case `dnd`: { color = `#ED4245`; break; }
            case `idle`: { color = `#FEE75C`; break; }
        };

        const customstatus = member.activities.find(activity => activity.type == 4);

        const presence = {
            status: {
                text: member.status,
                color,
            },
            text: customstatus.state,
            emote: customstatus?.emoji ? customstatus?.emoji?.name || `https://cdn.discordapp.com/emojis/${customstatus?.emoji?.id}.${customstatus?.emoji?.animated ? `gif` : `png`}?size=2048` : undefined,
        }

        const activities = [];
        member.activities.forEach(activity => {
            const { name, type, url, created_at, timestamps, application_id, details, state, assets } = activity;
            if (type == 4) return;

            activities.push({
                applicationId: application_id,
                name,
                url,
                details,
                state,
                createdTimestamp: created_at,
                timestamps,
                assets,
            });
        });

        return res.status(200).json({
            status: 200,
            message: `OK`,
            content: {
                id: member.user.id,
                username: member.user.username,
                discriminator: member.user.discriminator,
                nickname: member.nick || member.user.username,
                avatar: member.user.avatar ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.${member.user.avatar?.startsWith(`a_`) ? `gif` : `png`}?size=2048` : null,
                nickavatar: member.avatar ? `https://cdn.discordapp.com/guilds/${member.guild.id}/users/${member.id}/avatars/${member.avatar}.${member.avatar?.startsWith(`a_`) ? `gif` : `png`}?size=2048` : null,
                banner: user.banner ? `https://cdn.discordapp.com/banners/${member.user.id}/${user.banner}.${user.banner.startsWith(`a_`) ? `gif` : `png`}?size=600` : null,
                publicFlags: user.publicFlags,
                accentColor: user.accentColor,
                hexAccentColor: user.accentColor ? `#${parseInt(user.accentColor, 10).toString(16)}` : null,
                createdTimestamp: user.createdAt,
                presence,
                activities,
            }
        });
    }
}];