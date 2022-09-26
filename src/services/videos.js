const crypto = require("crypto");

const Repositories = require("../repositories/index.js");

class Videos {
    
    #db
    #repositories

    constructor(db) {
        this.#db = db;
        this.#repositories = new Repositories();
    }

    async save(params) {
        let resp;

        if (params.duration < 150) {
            return { err: `invalid video duration: minimum allowable duration of 150 seconds` };
        };

        resp = await this.#repositories.begin(this.#db)

        if (resp.err !== null) {
            return { err: `starting db transaction: ${resp.err}` };
        };

        const client = resp.client;

        resp = await (async function() {
            let resp;

            resp = await this.#repositories.videoCategories.getByName(client, params.category);

            if (resp.err !== null && resp.err !== "video category not found") {
                return { err: `retrieving video category by name ${params.name}: ${resp.err}` };
            }

            if (resp.err == "video category not found") {
                resp = await this.#repositories.videoCategories.insert(client, { name: params.category });

                if (resp.err !== null) {
                    return { err: `saving video category in database: ${resp.err}` };
                }
            };

            const category = resp.data;

            const key = crypto
                .createHash("sha256")
                .update(new Date().getTime().toString() + "-" + params.userID + "-" + params.name)
                .digest("hex");

            const videoParams = {
                userID: params.userID,
                categoryID: category.id,
                name: params.name,
                key: key,
                description: params.description,
                duration: params.duration,
                isSensible: params.isSensible
            };

            resp = await this.#repositories.videos.insert(client, videoParams);

            if (resp.err !== null) {
                return { err: `saving video in the database: ${resp.err}` };
            }

            return { err: null };
        }).bind(this)()

        if (resp.err !== null) {
            const rbResp = await this.#repositories.rollback(client)

            if (rbResp.err !== null) {
                return { err: `rolling back db transaction: ${rbResp.err}` };
            };

            return { err: resp.err };
        };

        resp = await this.#repositories.commit(client)

        if (resp.err !== null) {
            return { err: `commiting db transaction: ${resp.err}` };
        };

        return { err: null };
    }

    async list(filters) {
        const resp = await this.#repositories.videos.list(this.#db, filters);

        if (resp.err !== null) {
            return { data: null, err: `listing videos: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async listByUserID(user_id) {
        const resp = await this.#repositories.videos.listByUserID(this.#db, user_id);

        if (resp.err !== null) {
            return { data: null, err: `listing video categories: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async listByCategory(category_id) {
        const resp = await this.#repositories.videos.listByCategoryID(this.#db, category_id);

        if (resp.err !== null) {
            return { data: null, err: `listing video categories: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async listByName(name) {
        const resp = await this.#repositories.videos.listByName(this.#db, name);

        if (resp.err !== null) {
            return { data: null, err: `retrieving video categories by name: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async getByID(id) {
        const resp = await this.#repositories.videos.getByID(this.#db, id);

        if (resp.err !== null) {
            return { data: null, err: `retrieving video by id: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async update(id, params) {
        let resp

        if (params.duration < 150) {
            return { err: `invalid video duration: minimum allowable duration of 150 seconds` };
        };

        resp = await this.#repositories.begin(this.#db)

        if (resp.err !== null) {
            return { err: `starting db transaction: ${resp.err}` };
        };

        const client = resp.client;

        resp = await (async function() {
            let resp;

            resp = await this.#repositories.videoCategories.getByName(client, params.category);

            if (resp.err !== null && resp.err !== "video category not found") {
                return { err: `retrieving video category by name ${params.name}: ${resp.err}` };
            }

            if (resp.err == "video category not found") {
                resp = await this.#repositories.videoCategories.insert(client, { name: params.category });

                if (resp.err !== null) {
                    return { err: `saving video category in database: ${resp.err}` };
                };
            };

            const category = resp.data;

            const videoParams = {
                categoryID: category.id,
                name: params.name,
                description: params.description,
                duration: params.duration,
                isSensible: params.isSensible
            };

            resp = await this.#repositories.videos.update(client, id, videoParams);

            if (resp.err !== null) {
                return { err: `updating video in the database: ${resp.err}` };
            }

            return { err: null };
        }).bind(this)()

        if (resp.err !== null) {
            const rbResp = await this.#repositories.rollback(client)

            if (rbResp.err !== null) {
                return { err: `rolling back db transaction: ${rbResp.err}` };
            };

            return { err: resp.err };
        };

        resp = await this.#repositories.commit(client)

        if (resp.err !== null) {
            return { err: `commiting db transaction: ${resp.err}` };
        };

        return { err: null };
    }

    async delete(id) {
        const resp = await this.#repositories.videos.delete(this.#db, id);

        if (resp.err !== null) {
            return { err: `deleting video category ${id}: ${resp.err}` };
        }

        return { err: null };
    }
}

module.exports = Videos;
