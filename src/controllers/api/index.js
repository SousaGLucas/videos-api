const express = require("express");

const UsersHandlers = require("./users");
const VideoCategoriesHandlers = require("./video_categories");
const VideosHandlers = require("./videos");

class API {
    #app;

    constructor(app) {
        this.#app = app;
    }

    init() {
        const router = express();
        router.use(express.urlencoded({extended: true}));
        router.use(express.json());

        const users = new UsersHandlers(this.#app);
        const videoCategories = new VideoCategoriesHandlers(this.#app);
        const videos = new VideosHandlers(this.#app);

        // users routes
        router.post("/users", users.save.bind(users));
        router.get("/users", users.list.bind(users));
        router.get("/users/:user_id", users.getByID.bind(users));
        router.put("/users/:user_id", users.update.bind(users));
        router.put("/users/:user_id/status", users.updateStatus.bind(users));
        router.put("/users/:user_id/classification", users.updateClassification.bind(users));
        router.delete("/users/:user_id", users.delete.bind(users));

        // video_categories routes
        router.post("/video_categories", videoCategories.save.bind(videoCategories));
        router.get("/video_categories", videoCategories.list.bind(videoCategories));
        router.get("/video_categories/:category_id", videoCategories.getByID.bind(videoCategories));
        router.put("/video_categories/:category_id", videoCategories.update.bind(videoCategories));
        router.delete("/video_categories/:category_id", videoCategories.delete.bind(videoCategories));

        // videos routes
        router.post("/videos", videos.save.bind(videos));
        router.get("/videos", videos.list.bind(videos));
        router.get("/videos/:video_id", videos.getByID.bind(videos));
        router.put("/videos/:video_id", videos.update.bind(videos));
        router.delete("/videos/:video_id", videos.delete.bind(videos));

        return router;
    }
}

module.exports = API;
