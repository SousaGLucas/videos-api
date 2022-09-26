const Repositories = require("../repositories/index.js");

class Users {

    #db
    #repositories

    constructor(db) {
        this.#db = db;
        this.#repositories = new Repositories();
    }

    async save(params) {
        const resp = await this.#repositories.users.insert(this.#db, params);

        if (resp.err !== null) {
            return { err: `saving user in the database: ${resp.err}` };
        }

        return { err: null };
    }

    async list(filters) {
        const resp = await this.#repositories.users.list(this.#db, filters);

        if (resp.err !== null) {
            return { data: null, err: `listing users: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async getByID(id) {
        const resp = await this.#repositories.users.getByID(this.#db, id);

        if (resp.err !== null) {
            return { data: null, err: `listing users by id: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async update(id, params) {
        const resp = await this.#repositories.users.update(this.#db, id, params);

        if (resp.err !== null) {
            return { data: null, err: `updating user ${id}: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async updateStatus(id, status) {
        const resp = await this.#repositories.users.updateStatus(this.#db, id, status);

        if (resp.err !== null) {
            return { data: null, err: `updating user status ${id}: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async updateClassification(id, classification) {
        const resp = await this.#repositories.users.updateClassification(this.#db, id, classification);

        if (resp.err !== null) {
            return { data: null, err: `updating user classification ${id}: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }

    async delete(id) {
        const resp = await this.#repositories.users.delete(this.#db, id);

        if (resp.err !== null) {
            return { data: null, err: `deleting user ${id}: ${resp.err}` };
        }

        return { data: resp.data, err: null };
    }
}

module.exports = Users;
