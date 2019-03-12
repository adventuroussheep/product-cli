DROP DATABASE if EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(20) NULL,
    price INTEGER(20) NULL,
    stock_quantity INTEGER(100) NULL,
    product_sales INTEGER (20) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("Aquarium", "Pet", 199, 20, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("Umbrella", "Home", 20, 35, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("Coffee Mug", "Home", 15, 20, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("Camera", "Tech", 299, 10, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("Headphones", "Tech", 49, 50, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("Comfy Chair", "Home", 249, 5, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("Chew Toy", "Pet", 5, 25, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("TV", "Tech", 499, 10, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("Alarm Clock", "Home", 19, 10, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("Dog Food", "Pet", 30, 20, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)VALUES("Winter Hat", "Home", 19, 30, 0);

CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INTEGER(20) NULL,
    total_sales INTEGER(20) NOT NULL,
    PRIMARY KEY (department_id)
);


INSERT INTO departments(department_name, over_head_costs, total_sales)VALUES("Pet", 500, 0);
INSERT INTO departments(department_name, over_head_costs, total_sales)VALUES("Home", 1000, 0);
INSERT INTO departments(department_name, over_head_costs, total_sales)VALUES("Tech", 2500, 0);
INSERT INTO departments(department_name, over_head_costs, total_sales)VALUES("Unlisted", 3000, 0);


SELECT * from products;

SELECT * FROM departments;