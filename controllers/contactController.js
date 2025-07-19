import pool from '../db.js';

export const contacts = async (req, res) => {
  const {
    firstName,
    lastName,
    businessEmail,
    companyName,
    phoneNumber,
    message,
  } = req.body;

  if (!firstName || !lastName || !businessEmail || !companyName || !message) {
    return res.status(400).json({ error: 'Please fill all required fields.' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO contacts (firstName, lastName, businessEmail, companyName, phoneNumber, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, businessEmail, companyName, phoneNumber, message]
    );

    res.status(201).json({ message: 'Form data saved successfully!', insertId: result.insertId });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Database error occurred' });
  }
};
