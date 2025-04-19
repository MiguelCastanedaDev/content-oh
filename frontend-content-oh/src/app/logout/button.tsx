'use client';

import { logout } from './action';

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </form>
  );
}
