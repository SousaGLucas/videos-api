const Users = require("./users.js");
const VideoCategories = require("./video_categories.js");
const Videos = require("./videos.js");

class Repositories {
    
    #users
    #videoCategories
    #videos

    constructor() {
        this.#users = new Users();
        this.#videoCategories = new VideoCategories();
        this.#videos = new Videos();
    }

    get users() {
        return this.#users;
    }

    get videoCategories() {
        return this.#videoCategories;
    }

    get videos() {
        return this.#videos;
    }

    async begin(db) {
        try {
            const client = await db.connect();

            await client.query("BEGIN");
            return { client: client, err: null };
        } catch (err) {
            return { client: null, err: err };
        }
    }

    async commit(client) {
        try {
            await client.query("COMMIT");
            return { err: null };
        } catch (err) {
            return { client: null, err: err };
        }
    }

    async rollback(client) {
        try {
            await client.query("ROLLBACK");
            return { err: null };
        } catch (err) {
            return { err: err };
        }
    }
}

module.exports = Repositories;
