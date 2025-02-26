USE sales_db;

CREATE TABLE Customers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE Products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL
);

CREATE TABLE Orders (
    id VARCHAR(50) PRIMARY KEY,
    customerId VARCHAR(50) NOT NULL,
    region VARCHAR(255) NOT NULL,
    dateOfSale DATE NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    FOREIGN KEY (customerId) REFERENCES Customers(id)
);

CREATE TABLE OrderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId VARCHAR(50) NOT NULL,
    productId VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10,2) NOT NULL,
    discount DECIMAL(5,2),
    shippingCost DECIMAL(10,2),
    FOREIGN KEY (orderId) REFERENCES Orders(id),
    FOREIGN KEY (productId) REFERENCES Products(id)
);