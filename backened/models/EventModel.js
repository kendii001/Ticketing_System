import pool from "../db.js";

const Event = {
  async create({
    title,
    description,
    category,
    eventDate,
    eventTime,
    venue,
    price,
    organizerName,
    imageUrl,
    created_at,
    status,
  }) {
    const result = await pool.query(
      `INSERT INTO events
        (title, description, category, event_date, event_time, venue, price, organizer_name, image_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [title, description, category, eventDate, eventTime, venue, price, organizerName, imageUrl, status || "pending"]
    );
    return result.rows[0];
  },

  async findAll({ q, country, category, date, status }) {
    let query = `SELECT * FROM events WHERE 1=1`;
    const values = [];
    let i = 1;

    if (q) {
      query += ` AND title ILIKE $${i++}`;
      values.push(`%${q}%`);
    }

    if (country) {
      query += ` AND venue ILIKE $${i++}`;
      values.push(`%${country}%`);
    }

    if (category && category !== "All Categories") {
      query += ` AND category = $${i++}`;
      values.push(category);
    }

    if (date) {
      query += ` AND event_date = $${i++}`;
      values.push(date);
    }

    if (status) {
      const statuses = Array.isArray(status) ? status : [status];

      if (statuses.length === 1) {
        query += ` AND status = $${i++}`;
        values.push(statuses[0]);
      } else {
        const placeholders = statuses.map(() => `$${i++}`).join(", ");
        query += ` AND status IN (${placeholders})`;
        values.push(...statuses);
      }
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, values);
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
    return result.rows[0];
  },

  async update(id, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return null;

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
    const values = keys.map((key) => fields[key]);

    const result = await pool.query(
      `UPDATE events SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0];
  },

  async updateStatus(id, status) {
    const result = await pool.query(
      `UPDATE events SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(`DELETE FROM events WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
  },
};

export default Event;