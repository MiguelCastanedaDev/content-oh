'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Checkout, GetProducts } from "./action";
import './styles.css'

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await GetProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const addToCart = (product: any) => {
    setCart((prevCart) => [...prevCart, product]);
    setTotal((prevTotal) => {
      const newTotal = prevTotal + Number(product.price);
      return parseFloat(newTotal.toFixed(2));
    });
    
  };

  async function checkout (total: number){
    const payment_url = await Checkout(total);

    if (payment_url) {
      window.location.href = payment_url;
    }
  }

  return (
    <div className="container-main">
      <Link href="/users/login">Login</Link>

      <h2>Productos</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong>{product.description}
            <button onClick={() => addToCart(product)}>Agregar</button>
          </li>
        ))}
      </ul>

      <h2>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong>: {item.description} — {item.price} MXN
            </li>
          ))}
        </ul>
      )}
      <span><strong>Total:</strong> {total} MXN</span>
      <button onClick={() => checkout(total)}>Comprar</button>
    </div>
  );
}