import pool from "../db.js";

const Pending = {
  // Events
  async getPendingEvents() {
    const result = await pool.query(
      `SELECT * FROM events WHERE status = 'pending' ORDER BY created_at DESC`
    );
    return result.rows;
  },

  async approveEvent(id) {
    const result = await pool.query(
      `UPDATE events SET status = 'published' WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  },

  async rejectEvent(id) {
    const result = await pool.query(
      `UPDATE events SET status = 'rejected' WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  },

  // Organizers
  async getPendingOrganizers() {
    const result = await pool.query(
      `SELECT * FROM organizers WHERE status = 'pending' ORDER BY created_at DESC`
    );
    return result.rows;
  },

  async approveOrganizer(id) {
    const result = await pool.query(
      `UPDATE organizers SET status = 'approved' WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  },

  async rejectOrganizer(id) {
    const result = await pool.query(
      `UPDATE organizers SET status = 'rejected' WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  },
};

export default Pending;