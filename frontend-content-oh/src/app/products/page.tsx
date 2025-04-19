import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '../logout/button';
import './styles.css'

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  company: string;
  category: string;
};

export default async function ProductsPage() {
    const token = cookies().get('token')?.value;

    if (!token) redirect('/users/login');

    const res = await fetch('http://localhost:3000/products', {
        headers: {
        Authorization: `Bearer ${token}`
        },
        cache: 'no-store'
    });

    if (!res.ok) {
        return <p className="text-red-500">Error al obtener los productos</p>;
    }

    const products: Product[] = await res.json();


    return (
        
        <div className="max-w-4xl mx-auto mt-10">
            <LogoutButton />

            <h1 className="text-3xl font-bold mb-6">Tus productos</h1>
            {products.length === 0 ? (
                <p>No tienes productos registrados.</p>
            ) : (
                <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Company</th>
                    <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>${product.price}</td>
                        <td>{product.company}</td>
                        <td>{product.category}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
        </div>
    );
}
