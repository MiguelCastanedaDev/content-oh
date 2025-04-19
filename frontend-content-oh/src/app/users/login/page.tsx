'use client';

import { useState, FormEvent } from 'react';
import { loginAction } from './action';
import './styles.css'
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      await loginAction(form);
    } catch (err: any) {
      setError('Correo o contraseña incorrectos');
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <h1 className="h1">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="form">
        <input name="email" type="email" placeholder="Correo" className="input" required />
        <input name="password" type="password" placeholder="Contraseña" className="input" required />
        <button type="submit" className="button">Ingresar</button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      <Link href="/">Regresar a la tienda</Link>
    </div>
  );
}
