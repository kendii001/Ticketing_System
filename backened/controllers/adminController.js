import pool from "../db.js";

// Dashboard stats based on the live events table
export const getDashboardStats = async (req, res) => {
  try {
    const [eventsResult, publishedEventsResult, pendingEventsResult] = await Promise.all([
      pool.query(`SELECT COUNT(*) AS total_events FROM events`),
      pool.query(`SELECT COUNT(*) AS published_events FROM events WHERE status = 'published'`),
      pool.query(`SELECT COUNT(*) AS pending_events FROM events WHERE status = 'pending'`),
    ]);

    const totalEvents = parseInt(eventsResult.rows[0].total_events, 10) || 0;
    const publishedEvents = parseInt(publishedEventsResult.rows[0].published_events, 10) || 0;
    const pendingEvents = parseInt(pendingEventsResult.rows[0].pending_events, 10) || 0;

    res.json({
      success: true,
      stats: {
        totalEvents,
        organizers: publishedEvents,
        ticketsSold: pendingEvents,
        revenue: 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch dashboard stats." });
  }
};

// Pending organizer approvals (mapped to pending event creators from the live events table)
export const getPendingOrganizers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT organizer_name AS name, organizer_name AS email, id
       FROM events
       WHERE status = 'pending'
       ORDER BY id DESC`
    );
    res.json({ success: true, organizers: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch pending organizers." });
  }
};

export const approveOrganizer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE events SET status = 'published' WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }
    res.json({ success: true, organizer: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to approve organizer." });
  }
};

export const rejectOrganizer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE events SET status = 'rejected' WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }
    res.json({ success: true, organizer: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to reject organizer." });
  }
};

// Pending event approvals
export const getPendingEvents = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, organizer_name, event_date, venue, status
       FROM events
       WHERE status = 'pending'
       ORDER BY created_at DESC`
    );
    res.json({ success: true, events: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch pending events." });
  }
};

export const approveEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE events SET status = 'published' WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }
    res.json({ success: true, event: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to approve event." });
  }
};

export const rejectEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE events SET status = 'rejected' WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }
    res.json({ success: true, event: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to reject event." });
  }
};

// Recent events for dashboard
export const getRecentPayments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title AS event_title, status, created_at, organizer_name AS customer_name, price AS amount
       FROM events
       ORDER BY created_at DESC
       LIMIT 10`
    );
    res.json({ success: true, payments: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch recent payments." });
  }
};