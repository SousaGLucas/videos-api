const Users = require("./users.js");
const VideoCategories = require("./video_categories.js");
const Videos = require("./videos.js");

class Services {
    
    #users
    #videoCategories
    #videos

    constructor(db) {
        this.#users = new Users(db);
        this.#videoCategories = new VideoCategories(db);
        this.#videos = new Videos(db);
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
}

module.exports = Services;
