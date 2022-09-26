const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const Users = require("./handlers/users.js");
const VideoCategories = require("./handlers/video_categories.js");
const Videos = require("./handlers/videos.js");

class Commander {
    #rl;
    #label;

    constructor() {
        this.#rl = readline.createInterface({ input, output });
        this.#label = "videos# ";
    }

    init(handler) {
        console.log("");
        this.#rl.setPrompt(this.#label);
        this.#rl.prompt();

        this.#rl.on("line", (input) => {
            console.log("");
            if (input) {
                const [ cmd, method, entity, ...params ] = input.split(" ");
                switch (cmd) {
                    case "help":
                        this.help();
                        break;
                    case "exit":
                        this.close();
                        return;
                    case "exec":
                        handler(method, entity, params);
                        break;
                    default:
                        this.help();
                };
            }
            console.log("");

            this.#rl.prompt();
        });
    }

    print(data) {
        console.log(data);
    }

    table(data) {
        console.table(data);
    }

    close() {
        this.#rl.close();
    }

    help() {
        console.log(" videos v0.0.1");
        console.log("\n");
        console.log(" USAGE:");
        console.log("\n");
        console.log("   help                                                                    show help");
        console.log("   exit                                                                    exit cli");
        console.log("\n");
        console.log("   exec insert users [name] [email] [phone] [active] [classification]      insert users");
        console.log("   exec get users -i [id]                                                  get users by id");
        console.log("   exec get users -n [name]                                                get users by name");
        console.log("   exec update users [name] [email] [phone]                                update users");
        console.log("   exec update users status [status]                                       update users status");
        console.log("   exec update users classification [classification]                       update users classification");
        console.log("   exec delete users [id]                                                  delete users");
        console.log("\n");
        console.log("   exec insert video_categories [name]                                     insert video categories");
        console.log("   exec get video_categories -i [id]                                       get video categories by id");
        console.log("   exec get video_categories -n [name]                                     get video categories by name");
        console.log("   exec update video_categories [name]                                     update video categories");
        console.log("   exec delete video_categories [id]                                       delete video categories");
        console.log("\n");
        console.log("   exec insert videos [name]                                               insert video categories");
        console.log("   exec get videos -i [id]                                                 get video categories by id");
        console.log("   exec get videos -n [name]                                               get video categories by name");
        console.log("   exec update videos [name]                                               update video categories");
        console.log("   exec delete videos [id]                                                 delete video categories");
    }
}

class CLI extends Commander {

    #app;
    #handler;

    constructor(app) {
        super();
        this.#app = app;
        this.#handler = function(method, entity, params) {
            switch (entity) {
                case "users":
                    break;
                case "video_categories":
                    break;
                case "videos":
                    break;
                default:
                    break;
            };
        };
    }

    init() {
        super.init(this.#handler);
    }
}

module.exports = CLI;
