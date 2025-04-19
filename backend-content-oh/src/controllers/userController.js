// controllers/userController.js
const db = require('../db/connection');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.createUser = async (req, res) => {
  const { first_name, first_last_name, second_last_name, email, password } = req.body;
  // Hashear la contraseña antes de guardar
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await db.query('INSERT INTO users (first_name, first_last_name, second_last_name, email, password) VALUES ($1, $2, $3, $4, $5)', [first_name, first_last_name, second_last_name, email, hashedPassword]);
    res.status(201).json({ message: `Usuario ${first_name} creado.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};