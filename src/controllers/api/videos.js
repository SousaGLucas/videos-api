
class VideosHandlers {

    #app

    constructor(app) {
        this.#app = app;
    }

    async save(req, res) {

        const name = req.body.name;
        const userID = req.body.user_id;
        const category = req.body.category;
        const description = req.body.description;
        const duration = req.body.duration;
        const isSensible = req.body.is_sensible;
        
        if (typeof name !== "string") {
            res.status(400).send(`Bad Request: invalid video name: ${name}`);
            return false;
        };

        if (typeof userID !== "string") {
            res.status(400).send(`Bad Request: invalid vedeo user id: ${userID}`);
            return false;
        };

        if (typeof category !== "string") {
            res.status(400).send(`Bad Request: invalid video category: ${category}`);
            return false;
        };

        if (typeof description !== "string") {
            res.status(400).send(`Bad Request: invalid video description: ${description}`);
            return false;
        };

        if (typeof duration !== "number") {
            res.status(400).send(`Bad Request: invalid video duration: ${duration}`);
            return false;
        };

        if (typeof isSensible !== "boolean") {
            res.status(400).send(`Bad Request: invalid video sensitivity: ${isSensible}`);
            return false;
        };

        const params = {
            userID: userID,
            name: name,
            category: category,
            description: description,
            duration: duration,
            isSensible: isSensible
        };

        const resp = await this.#app.videos.save(params);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            if (resp.err.indexOf("invalid video duration") !== -1) {
                res.status(400).send(`Bad Request: invalid video duration: minimum allowable duration of 150 seconds`);
                return true;
            };

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(201).end();
        return false;
    }

    async list(req, res) {

        const name = req.query.name || "";
        const userID = req.query.user_id || "";
        const categoryID = req.query.category_id || "";

        if (typeof name !== "string") {
            res.status(400).send(`Bad Request: invalid video name: ${name}`);
            return false;
        };

        if (typeof userID !== "string") {
            res.status(400).send(`Bad Request: invalid user id: ${userID}`);
            return false;
        };

        if (typeof categoryID !== "string") {
            res.status(400).send(`Bad Request: invalid category id: ${categoryID}`);
            return false;
        };

        const filters = {
            name: name,
            userID: userID,
            categoryID: categoryID
        };

        const resp = await this.#app.videos.list(filters);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).send(resp.data);
        return false;
    }

    async getByID(req, res) {

        const id = req.params.video_id;

        if (typeof id !== "string") {
            res.status(400).send(`Bad Request: invalid video id: ${id}`);
            return false;
        };

        const resp = await this.#app.videos.getByID(id);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).send(resp.data);
        return false;
    }

    async update(req, res) {

        const id = req.params.video_id;
        const name = req.body.name;
        const category = req.body.category;
        const description = req.body.description;
        const duration = req.body.duration;
        const isSensible = req.body.is_sensible;

        if (typeof id !== "string") {
            res.status(400).send(`Bad Request: invalid video id: ${id}`);
            return false;
        };
        
        if (typeof name !== "string") {
            res.status(400).send(`Bad Request: invalid video name: ${name}`);
            return false;
        };

        if (typeof category !== "string") {
            res.status(400).send(`Bad Request: invalid video category: ${category}`);
            return false;
        };

        if (typeof description !== "string") {
            res.status(400).send(`Bad Request: invalid video description: ${description}`);
            return false;
        };

        if (typeof duration !== "number") {
            res.status(400).send(`Bad Request: invalid video duration: ${duration}`);
            return false;
        };

        if (typeof isSensible !== "boolean") {
            res.status(400).send(`Bad Request: invalid video sensitivity: ${isSensible}`);
            return false;
        };

        const params = { 
            name: name,
            category: category,
            description: description,
            duration: duration,
            isSensible: isSensible
        };

        const resp = await this.#app.videos.update(id, params);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            if (resp.err.indexOf("invalid video duration") !== -1) {
                res.status(400).send(`Bad Request: invalid video duration: minimum allowable duration of 150 seconds`);
                return true;
            };

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).end();
        return false;
    }

    async delete(req, res) {

        const id = req.params.video_id;

        if (typeof id !== "string") {
            res.status(400).send(`Bad Request: invalid video id: ${id}`);
            return false;
        };

        const resp = await this.#app.videos.delete(id);

        if (resp.err !== null) {
            console.log({ err: resp.err });

            res.status(500).send("Internal Server Error");
            return true;
        };

        res.status(200).end();
        return false;
    }
}

module.exports = VideosHandlers;
