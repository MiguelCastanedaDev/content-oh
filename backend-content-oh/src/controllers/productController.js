// controllers/productController.js
const db = require('../db/connection');

// GET /products (todos públicos)
exports.getAllProducts = async (req, res) => {
  const result = await db.query('SELECT * FROM products'); 
  res.json(result.rows);
};

// GET /products (solo los del usuario)
exports.getProducts = async (req, res) => {
  const userId = req.user.userId;
  const result = await db.query('SELECT * FROM products WHERE user_id = $1', [userId]);
  res.json(result.rows);
};

// GET /products/:id
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const result = await db.query('SELECT * FROM products WHERE id = $1 AND user_id = $2', [id, userId]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(result.rows[0]);
};

// POST /products
exports.createProduct = async (req, res) => {
  const { name, description, price, company, category } = req.body;
  const userId = req.user.userId;

  const query = `
    INSERT INTO products (name, description, price, company, category, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
  const values = [name, description, price, company, category, userId];

  const result = await db.query(query, values);
  res.status(201).json(result.rows[0]);
};

// PUT /products/:id
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const { name, description, price, company, category } = req.body;

  const result = await db.query(`
    UPDATE products
    SET name = $1, description = $2, price = $3, company = $4, category = $5
    WHERE id = $6 AND user_id = $7
    RETURNING *`, [name, description, price, company, category, id, userId]);

  if (result.rows.length === 0) return res.status(404).json({ error: 'No se pudo actualizar el producto' });
  res.json(result.rows[0]);
};

// DELETE /products/:id
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const result = await db.query('DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'No se pudo eliminar el producto' });
  res.json({ message: 'Producto eliminado' });
};
