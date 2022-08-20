const { start, log } = require(`./utils/logger.js`);
start(`App`, `Connecting to WebSocket..`, `blue`);

//* Importing Config
const config = require(`./config.js`);

//* Initializing Client object
const { Client } = require(`eris`);
const client = new Client(config.discordToken, {
    allowedMentions: {
        users: true,
        roles: true,
    },
    defaultImageFormat: `png`,
    defaultImageSize: 256,
    intents: [
        `guilds`,
        `guildMessages`,
        `directMessages`,
    ],
    restMode: true,
});

module.exports = client;

//* Importing Config into the client
Object.keys(config).forEach(async (key) => client[key] = config[key]);

//* Creating Wait Function
client.wait = (time) => new Promise(resolve => setTimeout(resolve, time));

//* Handlers
client.interactions = {};
const { readdirSync } = require(`fs`);
const names = readdirSync(`./handlers/`).filter(file => file.endsWith(`.js`));
names.forEach(name => {
    require(`./handlers/${name}`)(client);
});

client.connect();

//* Web server
const express = require(`express`);
const path = require(`path`);
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, PATCH`);
    res.setHeader(`Access-Control-Allow-Headers`, `Content-Type, Authorization`);
    res.setHeader(`Access-Control-Allow-Credentials`, true);

    next();
});

app.get(`*`, (req, res, next) => {
    if (client.ready) return next();
    
    return res.status(500).send({
        status: 500,
        message: `The client is not available`,
    });
});

const authentication = require(`./api/middleware/authentication.js`);

const { walk } = require(`./utils/filesystem.js`);
walk(path.join(__dirname, `api/routes`)).forEach(file => {
    const relativePath = file.replace(path.join(__dirname, `routes`), ``);
    const routePath = relativePath.split(`\\`).join(`/`).replace(`.js`, ``);
    const routes = require(file);

    routes.forEach(route => {
        if (!route.method) return;

        const run = route.authentication ? [authentication, route.run] : route.run;
        app[route.method](route.path ? route.path : routePath, run);
    });
});

app.get(`*`, (req, res) => {
    res.status(404).json({
        status: 404,
        message: `You have entered an invalid route!`,
    });
});

app.listen(client.serverPort, (error) => {
    if (error) log(`API`, JSON.stringify(error), `red`);

    log(`API`, `Listening to http://localhost:${client.serverPort}`, `green`);
});

process.on(`uncaughtException`, (error) => log(`Uncaught Error`, error.stack, `red`))