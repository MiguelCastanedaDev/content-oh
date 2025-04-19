const express = require('express')
const dotenv = require('dotenv');

const app = express()
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// Usar rutas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port localhost:${PORT}`)
})