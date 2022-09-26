
class UsersHandlers {

    #app

    constructor(app) {
        this.#app = app;
    }

    async save(req, res) {

        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const active = req.body.active;

        if (typeof name !== "string") {
            res.status(400).send(`Bad Request: invalid user name: ${name}`);
            return false;
        };

        if (typeof email !== "string") {
            res.status(400).send(`Bad Request: invalid user email: ${email}`);
            return false;
        };

        if (typeof phone !== "string") {
            res.status(400).send(`Bad Request: invalid user phone: ${phone}`);
            return false;
        };

        if (typeof active !== "boolean") {
            res.status(400).send(`Bad Request: invalid user active: ${active}`);
            return false;
        };

        const params = { 
            name: name,
            email: email,
            phone: phone,
            active: active,
        };

        const resp = await this.#app.users.save(params);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(201).end();
        return false;
    }

    async list(req, res) {

        const name = req.query.name || "";

        if (typeof name !== "string") {
            res.status(400).send(`Bad Request: invalid user name: ${name}`);
            return false;
        };

        const filters = {
            name: name
        };

        const resp = await this.#app.users.list(filters);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).send(resp.data);
        return false;
    }

    async getByID(req, res) {

        const userID = req.params.user_id;

        if (typeof userID !== "string") {
            res.status(400).send(`Bad Request: invalid user id: ${userID}`);
            return false;
        };

        const resp = await this.#app.users.getByID(userID);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).send(resp.data);
        return false;
    }

    async update(req, res) {

        const userID = req.params.user_id;
        const name = req.body.name;
        const phone = req.body.phone;

        if (typeof userID !== "string") {
            res.status(400).send(`Bad Request: invalid user id: ${userID}`);
            return false;
        };
        
        if (typeof name !== "string") {
            res.status(400).send(`Bad Request: invalid user name: ${name}`);
            return false;
        };

        if (typeof phone !== "string") {
            res.status(400).send(`Bad Request: invalid user phone: ${phone}`);
            return false;
        };

        const params = { 
            name: name,
            phone: phone,
        };

        const resp = await this.#app.users.update(userID, params);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).end();
        return false;
    }

    async updateStatus(req, res) {

        const userID = req.params.user_id;
        const status = req.body.status;

        if (typeof userID !== "string") {
            res.status(400).send(`Bad Request: invalid user id: ${userID}`);
            return false;
        };
        
        if (typeof status !== "boolean") {
            res.status(400).send(`Bad Request: invalid status: ${status}`);
            return false;
        };

        const resp = await this.#app.users.updateStatus(userID, status);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).end();
        return false;
    }

    async updateClassification(req, res) {

        const userID = req.params.user_id;
        const classification = req.body.classification;

        if (typeof userID !== "string") {
            res.status(400).send(`Bad Request: invalid user id: ${userID}`);
            return false;
        };

        if (typeof classification !== "string") {
            res.status(400).send(`Bad Request: invalid classification: ${status}`);
            return false;
        };

        const resp = await this.#app.users.updateClassification(userID, classification);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).end();
        return false;
    }

    async delete(req, res) {

        const userID = req.params.user_id;

        if (typeof userID !== "string") {
            res.status(400).send(`Bad Request: invalid user id: ${userID}`);
            return false;
        };

        const resp = await this.#app.users.delete(userID);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).end();
        return false;
    }
}

module.exports = UsersHandlers;
