CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL (11, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (item_id)
);

DESCRIBE products;

SELECT * FROM products;

UPDATE products SET product_name = "Saga: Vol. 1" WHERE item_id = 6;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 299.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Zelda", "Electronics", 59.99, 67);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sunglasses", "Apparel", 19.95, 54);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Belt", "Apparel", 9.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ready Player One", "Books", 8.79, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Saga: Vol. 1", "Books", 9.93, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shire Pipe", "Household", 19.93, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rolling Papers", "Household", 4.30, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Telestrations", "Board Games", 24.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sushi Go", "Board Games", 9.99, 40);