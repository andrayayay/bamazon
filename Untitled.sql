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

