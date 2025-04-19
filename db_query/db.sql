---USE POSTGRESQL

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    first_last_name VARCHAR(100) NOT NULL,
    second_last_name VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TYPE company_enum AS ENUM ('Amazon', 'Walmart', 'HEB', 'Chedraui');
CREATE TYPE category_enum AS ENUM ('Abarrotes', 'Deportes', 'Tecnología', 'Hogar', 'Ropa', 'Juguetes');

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    company company_enum NOT NULL,
    category category_enum NOT NULL,
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);