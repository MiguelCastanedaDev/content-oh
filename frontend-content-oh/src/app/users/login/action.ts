'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  const { token } = await res.json();

  cookies().set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 // 1 día
  });

  redirect('/products');
}
