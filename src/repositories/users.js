
class Users {

    async insert(db, params) {
        try {
            const query = {
                text: `--sql
                    INSERT INTO users (name, email, phone, active)
                    VALUES ($1, $2, $3, $4);
                `,
                values: [ params.name, params.email, params.phone, params.active ],
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
            where += `AND name LIKE '%' || $${values.length + 1} || '%'`;
            values.push(filters.name);
        };

        try {
            const query = {
                text: `--sql
                    SELECT id, name, email, phone, active, classification, created_at
                    FROM users
                    WHERE deleted_at ISNULL
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
                    SELECT id, name, email, phone, active, classification, created_at
                    FROM users
                    WHERE id = $1
                        AND deleted_at ISNULL;
                `,
                values: [ id ],
            };

            const data = await db.query(query);

            if (data.rows.length === 0) {
                return { data: data.rows, err: "user not found" };
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
                    UPDATE users
                    SET
                        name = $2,
                        phone = $3,
                        updated_at = now()
                    WHERE id = $1;
                `,
                values: [ id, params.name, params.phone ],
            };

            await db.query(query);
            return { err: null };
        } catch (err) {
            return { err: err };
        };
    }

    async updateStatus(db, id, status) {
        try {
            const query = {
                text: `--sql
                    UPDATE users
                    SET
                        active = $2,
                        updated_at = now()
                    WHERE id = $1;
                `,
                values: [ id, status ],
            };

            await db.query(query);
            return { err: null };
        } catch (err) {
            return { err: err };
        };
    }

    async updateClassification(db, id, classification) {
        try {
            const query = {
                text: `--sql
                    UPDATE users
                    SET
                        classification = $2,
                        updated_at = now()
                    WHERE id = $1;
                `,
                values: [ id, classification ],
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
                    UPDATE users
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

module.exports = Users;
