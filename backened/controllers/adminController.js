import pool from "../db.js";

// Dashboard stats — total events, organizers, tickets sold, revenue
export const getDashboardStats = async (req, res) => {
  try {
    const eventsResult = await pool.query(`SELECT COUNT(*) FROM events`);
    const organizersResult = await pool.query(
      `SELECT COUNT(*) FROM organizers WHERE status = 'approved'`
    );
    const paymentsResult = await pool.query(
      `SELECT COUNT(*) AS tickets_sold, COALESCE(SUM(amount), 0) AS revenue FROM payments WHERE status = 'paid'`
    );

    res.json({
      success: true,
      stats: {
        totalEvents: parseInt(eventsResult.rows[0].count, 10),
        organizers: parseInt(organizersResult.rows[0].count, 10),
        ticketsSold: parseInt(paymentsResult.rows[0].tickets_sold, 10),
        revenue: parseFloat(paymentsResult.rows[0].revenue),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch dashboard stats." });
  }
};

// Pending organizer approvals
export const getPendingOrganizers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM organizers WHERE status = 'pending' ORDER BY created_at DESC`
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
      `UPDATE organizers SET status = 'approved' WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Organizer not found." });
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
      `UPDATE organizers SET status = 'rejected' WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Organizer not found." });
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
      `SELECT * FROM events WHERE status = 'pending' ORDER BY created_at DESC`
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

// Recent payments
export const getRecentPayments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.amount, p.status, p.created_at, c.name AS customer_name, e.title AS event_title
       FROM payments p
       JOIN customers c ON p.customer_id = c.id
       JOIN events e ON p.event_id = e.id
       ORDER BY p.created_at DESC
       LIMIT 10`
    );
    res.json({ success: true, payments: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch recent payments." });
  }
};