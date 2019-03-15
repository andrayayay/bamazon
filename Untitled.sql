CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NULL,
	department_name VARCHAR(50) NULL,
	price decimal(10,4) NULL,
	stock_quantity INTEGER(50),
    PRIMARY KEY (id)
);

ALTER TABLE products
MODIFY id INTEGER (11) NOT NULL AUTO_INCREMENT;

    
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone Charger", "Electronics", 7.99, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hydro Flask", "Essentials", 30.99, 1200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scrabble", "Games", 12.99, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Women's Daily Multi Vitamin", "Health", 34.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Matcha Green Tea Powder", "Food", 20.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flower Press", "Crafts", 40.99, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Catnip", "Pets", 6.99, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Orgain Protein Powder", "Food", 29.99, 2500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple TV", "Electronics", 149.99, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Prismacolor Pencils", "Crafts", 49.99, 1500);

SELECT * FROM products;