
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price INT NOT NULL,
    category VARCHAR(150)
);
