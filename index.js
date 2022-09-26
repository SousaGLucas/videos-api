require("dotenv/config");

const { Pool } = require("pg");

const App = require("./src/app.js");
const CLI = require("./src/controllers/cli/index.js");
const API = require("./src/controllers/api/index.js");

function main() {
    const pool = setupPGPoll();
    const app = new App().init(pool);

    const cmd = process.argv[2];

    if (!cmd) {
        startHTTPServer(app);
        return;
    };

    switch (cmd) {
        case "cli":
            initCLI(app);
            break;
        default:
            help();
    } 
}

main();

function setupPGPoll() {
    return new Pool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        max: 2,
    });
}

function initCLI(app) {
    const cli = new CLI(app);
    cli.init();
}

function startHTTPServer(app) {
    const api = new API(app);
    const router = api.init();

    router.listen(8080, () => { console.log("\nServer running on port 8080...") });
}

function help() {
    console.log("\n");
    console.log(" videos v0.0.1");
    console.log("\n");
    console.log(" USAGE:");
    console.log("   default     run HTTP server");
    console.log("   cli         run CLI controller");
    console.log("\n");
}
