
class VideCategories {
    
    async insert(db, params) {
        try {
            const query = {
                text: `--sql
                    INSERT INTO video_categories (name)
                    VALUES ($1)
                    RETURNING id;
                `,
                values: [ params.name ],
            };

            const data = await db.query(query);
            return { data: data.rows[0], err: null };
        } catch (err) {
            return { data: null, err: err };
        };
    }

    async list(db, filters) {
        let where = "";
        let values = [];

        if (filters.name !== "") {
            where += `WHERE name LIKE '%' || $${values.length + 1} || '%'`;
            values.push(filters.name);
        };

        try {
            const query = {
                text: `--sql
                    SELECT id, name
                    FROM video_categories
                    ${where};
                `,
                values: values,
            };

            const data = await db.query(query);
            return { data: data.rows, err: null };
        } catch (err) {
            return { data: null, err: err };
        };
    }

    async getByID(db, id) {
        try {
            const query = {
                text: `--sql
                    SELECT id, name
                    FROM video_categories
                    WHERE id = $1;
                `,
                values: [ id ],
            };

            const data = await db.query(query);

            if (data.rows.length === 0) {
                return { data: data.rows, err: "video category not found" };
            }

            return { data: data.rows[0], err: null };
        } catch (err) {
            return { data: null, err: err };
        };
    }

    async getByName(db, name) {
        try {
            const query = {
                text: `--sql
                    SELECT id, name
                    FROM video_categories
                    WHERE name = $1;
                `,
                values: [ name ],
            };

            const data = await db.query(query);

            if (data.rows.length === 0) {
                return { data: data.rows, err: "video category not found" };
            }

            return { data: data.rows[0], err: null };
        } catch (err) {
            return { data: null, err: err };
        };
    }

    async update(db, id, params) {
        try {
            const query = {
                text: `--sql
                    UPDATE video_categories
                    SET
                        name = $2
                    WHERE id = $1;
                `,
                values: [ id, params.name ],
            };

            await db.query(query);
            return { err: null };
        } catch (err) {
            return { err: err };
        };
    }

    async delete(db, id) {
        try {
            const query = {
                text: `--sql
                    DELETE FROM video_categories
                    WHERE id = $1;
                `,
                values: [ id ],
            };

            await db.query(query);
            return { err: null };
        } catch (err) {
            return { err: err };
        };
    }
}

module.exports = VideCategories;
