import pool from "../db.js";

const createContact = async (fullName, email, message) => {
    const result = await pool.query(
        `
        INSERT INTO contact_messages
        (full_name, email, message)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [fullName, email, message]
    );

    return result.rows[0];
};

const getAllContacts = async () => {
    const result = await pool.query(
        `
        SELECT *
        FROM contact_messages
        ORDER BY created_at DESC
        `
    );

    return result.rows;
};

const getContactById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM contact_messages
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

const markAsRead = async (id) => {
    const result = await pool.query(
        `
        UPDATE contact_messages
        SET is_read = true
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};

export default {
    createContact,
    getAllContacts,
    getContactById,
    markAsRead,
};