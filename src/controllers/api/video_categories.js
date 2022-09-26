
class VideoCategoriesHandlers {

    #app

    constructor(app) {
        this.#app = app;
    }

    async save(req, res) {

        const name = req.body.name;

        if (typeof name !== "string") {
            res.status(400).send(`Bad Request: invalid category name: ${name}`);
            return false;
        };

        const params = { 
            name: name
        };

        const resp = await this.#app.videoCategories.save(params);

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
            res.status(400).send(`Bad Request: invalid category name: ${name}`);
            return false;
        };

        const filters = {
            name: name
        };

        const resp = await this.#app.videoCategories.list(filters);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).send(resp.data);
        return false;
    }

    async getByID(req, res) {

        const id = req.params.category_id;

        if (typeof id !== "string") {
            res.status(400).send(`Bad Request: invalid category id: ${id}`);
            return false;
        };

        const resp = await this.#app.videoCategories.getByID(id);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).send(resp.data);
        return false;
    }

    async update(req, res) {

        const id = req.params.category_id;
        const name = req.body.name;

        if (typeof id !== "string") {
            res.status(400).send(`Bad Request: invalid category id: ${id}`);
            return false;
        };
        
        if (typeof name !== "string") {
            res.status(400).send(`Bad Request: invalid category name: ${name}`);
            return false;
        };

        const params = { 
            name: name,
        };

        const resp = await this.#app.videoCategories.update(id, params);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).end();
        return false;
    }

    async delete(req, res) {

        const id = req.params.category_id;

        if (typeof id !== "string") {
            res.status(400).send(`Bad Request: invalid category id: ${id}`);
            return false;
        };

        const resp = await this.#app.videoCategories.delete(id);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).end();
        return false;
    }
}

module.exports = VideoCategoriesHandlers;
