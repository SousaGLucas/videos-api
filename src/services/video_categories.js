const Repositories = require("../repositories/index.js");

class VideoCategories {
    
    #db
    #repositories

    constructor(db) {
        this.#db = db;
        this.#repositories = new Repositories();
    }

    async save(params) {
        const resp = await this.#repositories.videoCategories.insert(this.#db, params);

        if (resp.err !== null) {
            return { err: `saving video category in the database: ${resp.err}` };
        }

        return { err: null };
    }

    async list(filters) {
        const resp = await this.#repositories.videoCategories.list(this.#db, filters);

        if (resp.err !== null) {
            return { data: null, err: `listing video categories: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async getByID(id) {
        const resp = await this.#repositories.videoCategories.getByID(this.#db, id);

        if (resp.err !== null) {
            return { data: null, err: `retrieving video category by id: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async update(id, params) {
        const resp = await this.#repositories.videoCategories.update(this.#db, id, params);

        if (resp.err !== null) {
            return { err: `updating video category ${id}: ${resp.err}` };
        }

        return { err: null };
    }

    async delete(id) {
        const resp = await this.#repositories.videoCategories.delete(this.#db, id);

        if (resp.err !== null) {
            return { err: `deleting video category ${id}: ${resp.err}` };
        }

        return { err: null };
    }
}

module.exports = VideoCategories;
