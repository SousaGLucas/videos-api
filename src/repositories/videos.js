
class Videos {
    
    async insert(db, params) {
        try {
            const query = {
                text: `--sql
                    INSERT INTO videos (user_id, category_id, name, key, description, duration, is_sensible)
                    VALUES ($1, $2, $3, $4, $5, $6, $7);
                `,
                values: [
                    params.userID,
                    params.categoryID,
                    params.name,
                    params.key,
                    params.description,
                    params.duration,
                    params.isSensible
                ],
            };

            await db.query(query);
            return { err: null };
        } catch (err) {
            return { err: err };
        };
    }

    async list(db, filters) {
        let where = "";
        let values = [];

        if (filters.name !== "") {
            where += " ";
            where += `AND v.name LIKE '%' || $${values.length + 1} || '%'`;
            values.push(filters.name);
        };

        if (filters.userID !== "") {
            where += " ";
            where += `AND v.user_id = $${values.length + 1}`;
            values.push(filters.userID);
        };

        if (filters.categoryID !== "") {
            where += " ";
            where += `AND v.category_id = $${values.length + 1}`;
            values.push(filters.categoryID);
        };

        try {
            const query = {
                text: `--sql
                    SELECT
                        v.id,
                        u.name as user,
                        c.name as category,
                        v.name,
                        v.key,
                        v.description,
                        v.duration,
                        v.is_sensible,
                        v.created_at
                    FROM videos as v
                        INNER JOIN users as u ON u.id = v.user_id
                        INNER JOIN video_categories as c ON c.id = v.category_id
                    WHERE v.deleted_at ISNULL
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
                    SELECT
                        v.id,
                        u.name as user,
                        c.name as category,
                        v.name,
                        v.key,
                        v.description,
                        v.duration,
                        v.is_sensible,
                        v.created_at
                    FROM videos as v
                        INNER JOIN users as u ON u.id = v.user_id
                        INNER JOIN video_categories as c ON c.id = v.category_id
                    WHERE v.id = $1
                        AND v.deleted_at ISNULL;
                `,
                values: [ id ],
            };

            const data = await db.query(query);

            if (data.rows.length === 0) {
                return { data: data.rows, err: "video not found" };
            }

            return { data: data.rows, err: null };
        } catch (err) {
            return { data: null, err: err };
        };
    }

    async update(db, id, params) {
        try {
            const query = {
                text: `--sql
                    UPDATE videos
                    SET
                        category_id = $2,
                        name = $3,
                        description = $4,
                        duration = $5,
                        is_sensible = $6,
                        updated_at = now()
                    WHERE id = $1;
                `,
                values: [
                    id,
                    params.categoryID,
                    params.name,
                    params.description,
                    params.duration,
                    params.isSensible,
                ],
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
                    UPDATE videos
                    SET deleted_at = now()
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

module.exports = Videos;
