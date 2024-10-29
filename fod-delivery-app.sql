-- ###########################################################         CREATION QUERIES

create database FoodDeliveryDB;
use FoodDeliveryDB;

CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Admins (
    id INT PRIMARY KEY IDENTITY(1,1),
    admin_user_id INT FOREIGN KEY REFERENCES Users(id),
    level INT NOT NULL -- Level (1, 2 & 3)
);

CREATE TABLE Addresses (
    id INT PRIMARY KEY IDENTITY(1,1),
    entity_id INT, -- user_id or restaurant_id
    entity_type VARCHAR(50), -- USER or RESTAURANT
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_primary BIT DEFAULT 0
);

CREATE TABLE Restaurants (
    id INT PRIMARY KEY IDENTITY(1,1),
    owner_id INT FOREIGN KEY REFERENCES Users(id),
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    rating DECIMAL(2,1),
    opening_time DATETIME,
    closing_time DATETIME,
    is_approved BIT DEFAULT 0,
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Cuisines (
    id INT PRIMARY KEY IDENTITY(1,1),
    cuisine_name VARCHAR(50) UNIQUE
);

CREATE TABLE Categories (
    id INT PRIMARY KEY IDENTITY(1,1),
    category_name VARCHAR(50) UNIQUE
);

CREATE TABLE RestaurantCuisines (
    id INT PRIMARY KEY IDENTITY(1,1),
    restaurant_id INT FOREIGN KEY REFERENCES Restaurants(id),
    cuisine_id INT FOREIGN KEY REFERENCES Cuisines(id)
);

CREATE TABLE FoodItems (
    id INT PRIMARY KEY IDENTITY(1,1),
    restaurant_id INT FOREIGN KEY REFERENCES Restaurants(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cuisine_type_id INT FOREIGN KEY REFERENCES Cuisines(id), 
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    category_id INT FOREIGN KEY REFERENCES Categories(id),
    is_available BIT DEFAULT 1
);

CREATE TABLE DeliveryPartners  (
    id INT PRIMARY KEY IDENTITY(1,1),
    partner_id INT FOREIGN KEY REFERENCES Users(id),
    complaint_count INT,
    penalty INT,
    is_active BIT DEFAULT 1,
    delivery_phone_number VARCHAR(15),
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Orders (
    id INT PRIMARY KEY IDENTITY(1,1),
    customer_id INT FOREIGN KEY REFERENCES Users(id),
    restaurant_id INT FOREIGN KEY REFERENCES Restaurants(id),
    delivery_partner_id INT FOREIGN KEY REFERENCES DeliveryPartners(id),
    total_amount DECIMAL(10,2) NOT NULL,
    address INT FOREIGN KEY REFERENCES Addresses(id),
    status VARCHAR(20) CHECK (status IN ('Pending', 'Accepted', 'Preparing', 'OutForDelivery', 'Delivered', 'Cancelled')),
    created_at DATETIME DEFAULT GETDATE(),
    picked_at DATETIME,
    delivered_at DATETIME,
    payment_status VARCHAR(20) CHECK (payment_status IN ('Pending', 'Completed', 'Failed', 'Refunded'))
);

CREATE TABLE OrderItems (
    id INT PRIMARY KEY IDENTITY(1,1),
    order_id INT FOREIGN KEY REFERENCES Orders(id),
    food_item_id INT FOREIGN KEY REFERENCES FoodItems(id),
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE Reviews (
    id INT PRIMARY KEY IDENTITY(1,1),
    order_id INT FOREIGN KEY REFERENCES Orders(id),
    rating INT,
    comment TEXT,
    review_type VARCHAR(20) CHECK (review_type IN ('Restaurant', 'DeliveryPartner')),
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE DeliveryRequest  (
    id INT PRIMARY KEY IDENTITY(1,1),
    delivery_partner_id INT FOREIGN KEY REFERENCES DeliveryPartners(id),
    order_id INT FOREIGN KEY REFERENCES Orders(id),
    delivery_insentive INT,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Coupons (
    id INT PRIMARY KEY IDENTITY(1,1),
    code VARCHAR(20),
    discount_percentage DECIMAL(5,2) NOT NULL,
    restaurant_id INT FOREIGN KEY REFERENCES Restaurants(id),
    expiry DATETIME,
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Disputes (
    id INT PRIMARY KEY IDENTITY(1,1),
    order_id INT FOREIGN KEY REFERENCES Orders(id),
    reason TEXT,
    status VARCHAR(20) CHECK (status IN ('Pending','Resolved')),
    took_charge VARCHAR(20) CHECK (took_charge IN ('Restaurant','DeliveryPartner')),
    resolution TEXT,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Notifications (
    id INT PRIMARY KEY IDENTITY(1,1),
    admin_id INT FOREIGN KEY REFERENCES Admins(id),
    sent_to_user_id INT FOREIGN KEY REFERENCES Users(id),
    notification_text TEXT,
    redirection_link TEXT,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Logs (
    id INT PRIMARY KEY IDENTITY(1,1),
    entity_id INT,
    entity_type VARCHAR(50), -- USER, ADMIN, RESTAURANT, DELIVERY_PARTNER
    action_category VARCHAR(50), -- Order, Dispute, Delivery, Authenticaiton, Cart, etc.
    action_type VARCHAR(100), -- Order Created, Login, Order Delivered, etc.
    reference_id INT, -- OrderID, RestaurantID, etc.
    action_description TEXT,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Roles(
	RoleId INT PRIMARY KEY IDENTITY (1001,1),
	RoleType VARCHAR(40)
);

ALTER TABLE Users ADD RoleId INT FOREIGN KEY REFERENCES Roles(RoleId);


-- ###########################################################         INSERTION QUERIES


INSERT INTO Users (name, email, password_hash, phone_number, created_at) VALUES
('John Doe', 'john@example.com', 'password', '1234567890', '2024-10-14'),
('Jane Smith', 'jane@example.com', 'password', '0987654321', '2024-10-14'),
('Alice Brown', 'alice@example.com', 'password', '1122334455', '2024-10-14'),
('Bob Johnson', 'bob@example.com', 'password', '1231231234', '2024-10-14'),
('Charlie Davis', 'charlie@example.com', 'password', '4564564567', '2024-10-14'),
('David Evans', 'david@example.com', 'password', '7897897890', '2024-10-14'),
('Eve Foster', 'eve@example.com', 'password', '2223334444', '2024-10-14'),
('Frank Green', 'frank@example.com', 'password', '5556667777', '2024-10-14'),
('Grace Hill', 'grace@example.com', 'password', '8889990000', '2024-10-14'),
('Hannah Jackson', 'hannah@example.com', 'password', '9990001112', '2024-10-14'),
('Irene King', 'irene@example.com', 'password', '1010101010', '2024-10-14'),
('Jack Lee', 'jack@example.com', 'password', '2020202020', '2024-10-14'),
('Karen Moore', 'karen@example.com', 'password', '3030303030', '2024-10-14'),
('Leo Nelson', 'leo@example.com', 'password', '4040404040', '2024-10-14'),
('Mia Owens', 'mia@example.com', 'password', '5050505050', '2024-10-14'),
('Noah Parker', 'noah@example.com', 'password', '6060606060', '2024-10-14'),
('Olivia Quinn', 'olivia@example.com', 'password', '7070707070', '2024-10-14'),
('Paul Rivera', 'paul@example.com', 'password', '8080808080', '2024-10-14'),
('Quinn Scott', 'quinn@example.com', 'password', '9090909090', '2024-10-14'),
('Rachel Turner', 'rachel@example.com', 'password', '1111222233', '2024-10-14');

INSERT INTO Admins (admin_user_id, level) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 2),
(5, 1),
(6, 1);

INSERT INTO Addresses (entity_id, entity_type, address_line1, address_line2, city, state, zip_code, country, is_primary) VALUES
(1, 'USER', '123 Main St', '', 'New York', 'NY', '10001', 'USA', 1),
(2, 'USER', '456 Oak St', 'Apt 101', 'Los Angeles', 'CA', '90001', 'USA', 1),
(5, 'USER', '789 Pine St', '', 'Chicago', 'IL', '60601', 'USA', 1),
(7, 'USER', '222 Birch St', '', 'Philadelphia', 'PA', '19101', 'USA', 1),
(8, 'USER', '666 Cedar St', 'Apt 502', 'San Diego', 'CA', '92101', 'USA', 1),
(9, 'USER', '999 Cherry St', '', 'Dallas', 'TX', '75201', 'USA', 1),
(10, 'USER', '111 Oakwood St', '', 'San Francisco', 'CA', '94101', 'USA', 1),
(11, 'USER', '444 Poplar St', 'Apt 6B', 'Boston', 'MA', '02101', 'USA', 1),
(12, 'USER', '888 Magnolia St', '', 'Seattle', 'WA', '98101', 'USA', 1),
(13, 'USER', '777 Cypress St', '', 'Denver', 'CO', '80201', 'USA', 1),
(14, 'USER', '333 Palm St', '', 'Las Vegas', 'NV', '89101', 'USA', 1),
(15, 'USER', '321 Elm St', '', 'Houston', 'TX', '77001', 'USA', 1),
(16, 'USER', '987 Maple St', '', 'Miami', 'FL', '33101', 'USA', 1),
(17, 'USER', '555 Walnut St', 'Suite 201', 'Phoenix', 'AZ', '85001', 'USA', 1),
(1, 'RESTAURANT', '321 Main St', '', 'New York', 'NY', '10001', 'USA', 1),
(2, 'RESTAURANT', '456 Oak St', 'Apt 105', 'Los Angeles', 'CA', '90001', 'USA', 1),
(3, 'RESTAURANT', '99 Pine St', 'House 45', 'Chicago', 'IL', '60601', 'USA', 1);

INSERT INTO Restaurants (owner_id, name, phone_number, rating, opening_time, closing_time, is_approved, is_active, created_at) VALUES
(9, 'The Spicy Grill', '9876543210', 4.5, '2024-10-01 08:00:00', '2024-10-01 20:00:00', 1, 1, '2024-10-14'),
(10, 'Ocean''s Delight', '6543219870', 2.3, '2024-10-02 09:00:00', '2024-10-02 22:00:00', 1, 0, '2024-10-14'),
(11, 'Green Garden', '1239876540', 3.2, '2024-10-03 10:00:00', '2024-10-03 21:00:00', 0, 0, '2024-10-14');

INSERT INTO Cuisines (cuisine_name) VALUES
('Indian'),
('Chinese'),
('Italian'),
('Mexican');

INSERT INTO Categories (category_name) VALUES
('Appetizers'),
('Main Course'),
('Desserts'),
('Beverages');

INSERT INTO RestaurantCuisines (restaurant_id, cuisine_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 4);

INSERT INTO FoodItems (restaurant_id, name, description, cuisine_type_id, price, image_url, category_id, is_available) VALUES
(1, 'Chicken Tikka', 'Spicy grilled chicken', 1, 349.00, 'img1.jpg', 2, 1),
(1, 'Spring Rolls', 'Crispy spring rolls', 2, 150.00, 'img2.jpg', 1, 0),
(2, 'Pasta Carbonara', 'Creamy Italian pasta', 3, 410.00, 'img3.jpg', 2, 1),
(3, 'Tacos', 'Mexican beef tacos', 4, 179.00, 'img4.jpg', 2, 1),
(3, 'Churros', 'Fried dough pastry', 4, 130.00, 'img5.jpg', 3, 1);

INSERT INTO DeliveryPartners (partner_id, complaint_count, penalty, is_active, delivery_phone_number, created_at) VALUES
(16, 0, 0, 1, '1112223333', '2024-10-14'),
(17, 2, 0, 1, '3334445555', '2024-10-14');

INSERT INTO Orders (customer_id, restaurant_id, delivery_partner_id, total_amount, address, status, created_at, payment_status) VALUES
(7, 1, 1, 450.00, 7, 'Delivered', '2024-10-14', 'Completed'),
(8, 1, 2, 620.50, 8, 'Delivered', '2024-10-14', 'Completed'),
(9, 2, 1, 350.75, 9, 'Cancelled', '2024-10-13', 'Refunded'),
(10, 2, 2, 900.00, 10, 'OutForDelivery', '2024-10-13', 'Pending'),
(11, 3, 1, 1230.00, 11, 'Accepted', '2024-10-14', 'Pending'),
(12, 3, 2, 785.25, 12, 'Pending', '2024-10-14', 'Pending'),
(13, 1, 1, 2500.00, 13, 'Preparing', '2024-10-14', 'Pending'),
(7, 2, 1, 800.00, 7, 'OutForDelivery', '2024-10-14', 'Completed'),
(8, 3, 2, 670.40, 8, 'Pending', '2024-10-14', 'Pending'),
(9, 1, 1, 450.80, 9, 'Cancelled', '2024-10-14', 'Failed'),
(10, 2, 1, 310.55, 10, 'Delivered', '2024-10-14', 'Completed'),
(11, 3, 2, 1500.30, 11, 'Preparing', '2024-10-14', 'Pending'),
(12, 1, 1, 900.99, 12, 'Accepted', '2024-10-14', 'Completed'),
(13, 2, 1, 675.00, 13, 'Cancelled', '2024-10-14', 'Refunded');

INSERT INTO OrderItems (order_id, food_item_id, quantity, price) VALUES
(2, 1, 2, 150.00),
(3, 2, 1, 150.00),
(2, 3, 3, 200.00),
(2, 4, 1, 220.50),
(3, 1, 1, 350.75), 
(4, 5, 4, 100.00),
(4, 2, 1, 800.00),
(5, 5, 2, 450.00), 
(6, 3, 1, 300.00), 
(7, 4, 5, 500.00),
(7, 1, 2, 500.00),
(8, 2, 3, 670.40), 
(9, 3, 1, 450.80), 
(10, 1, 1, 310.55),
(11, 2, 4, 1500.30), 
(12, 3, 3, 900.99), 
(13, 4, 2, 675.00);

INSERT INTO Reviews (order_id, rating, comment, review_type, created_at) VALUES
(2, 5, 'Fantastic food, will order again!', 'Restaurant', '2024-10-14'),
(3, 4, 'Delivery was quick but food was slightly cold.', 'DeliveryPartner', '2024-10-14'),
(2, 3, 'Average experience, food could be better.', 'Restaurant', '2024-10-14'),
(2, 5, 'The delivery partner was very polite and prompt.', 'DeliveryPartner', '2024-10-14'),
(3, 2, 'Food was delivered late and not as described.', 'Restaurant', '2024-10-13'),
(4, 4, 'Great service but the food was undercooked.', 'Restaurant', '2024-10-13'),
(5, 5, 'Loved the food! Great taste and quality.', 'Restaurant', '2024-10-14'),
(5, 4, 'Delivery was excellent, no issues.', 'DeliveryPartner', '2024-10-14'),
(6, 3, 'Food was okay, not worth the price.', 'Restaurant', '2024-10-14'),
(7, 1, 'Delicious food, will definitely order again!', 'Restaurant', '2024-10-14'),
(8, 4, 'Quick delivery but the order was incomplete.', 'DeliveryPartner', '2024-10-14'),
(9, 2, 'Not satisfied with the taste.', 'Restaurant', '2024-10-14'),
(10, 3, 'Worst delivery experience, arrived too late.', 'DeliveryPartner', '2024-10-14'),
(11, 5, 'Absolutely amazing! Highly recommended!', 'Restaurant', '2024-10-14'),
(12, 4, 'Very good service, food was fresh.', 'DeliveryPartner', '2024-10-14'),
(13, 5, 'Best restaurant in the area!', 'Restaurant', '2024-10-14'),
(5, 3, 'The delivery took too long, but the food was hot!', 'DeliveryPartner', '2024-10-14'),
(2, 2, 'Expected better quality.', 'Restaurant', '2024-10-14'),
(3, 4, 'Delivery partner was rude.', 'DeliveryPartner', '2024-10-14'),
(4, 5, 'Not worth the hype, was disappointed.', 'Restaurant', '2024-10-14'),
(5, 5, 'Fantastic experience overall!', 'DeliveryPartner', '2024-10-14');

INSERT INTO DeliveryRequest (delivery_partner_id, order_id, delivery_insentive, created_at) VALUES
(1, 7, 22, '2024-10-14'),
(2, 10, 25, '2024-10-14');

INSERT INTO Coupons (code, discount_percentage, restaurant_id, expiry, is_active, created_at) VALUES
('DISCOUNT10', 10.0, 1, '2024-12-31', 1, '2024-10-14'),
('SAVE5', 5.0, 2, '2024-11-30', 0, '2024-10-14'),
('TACO20', 20.0, 3, '2024-10-31', 1, '2024-10-14');

INSERT INTO Disputes (order_id, reason, status, took_charge, resolution, created_at) VALUES
(2, 'Late delivery', 'Pending', 'DeliveryPartner', 'None', '2024-10-14'),
(3, 'Wrong item', 'Resolved', 'Restaurant', 'Refunded', '2024-10-14'),
(12, 'Cold food', 'Pending', 'Restaurant', 'None', '2024-10-14');

INSERT INTO Notifications (admin_id, sent_to_user_id, notification_text, redirection_link, created_at) VALUES
(1, 2, 'Your order has been shipped', 'www.google.com', '2024-10-14'),
(2, 3, 'Your refund has been processed', 'www.google.com', '2024-10-14'),
(1, 4, 'Your order is out for delivery', 'www.google.com', '2024-10-14');

INSERT INTO Logs (entity_id, entity_type, action_category, action_type, reference_id, action_description, created_at) VALUES
(1, 'USER', 'Order', 'Order Created', 1, 'Order 1 created by user 1', '2024-10-14'),
(2, 'USER', 'Order', 'Order Delivered', 2, 'Order 2 delivered by delivery partner 2', '2024-10-14'),
(3, 'USER', 'Order', 'Out For Delivery', 3, 'Order 3 is out for delivery by delivery partner 1', '2024-10-14');

INSERT INTO Roles (RoleType) VALUES
('admin-level1'),
('admin-level2'),
('admin-level3'),
('user'),
('delivery-partner'),
('restaurant-owner');


alter table Restaurants add image_url varchar(255) null 
	
UPDATE [FoodDeliveryDB].[dbo].[Restaurants]
SET [image_url] = CASE 
    WHEN [id] = 1 THEN 'https://cdn.pixabay.com/photo/2016/11/19/12/44/burgers-1839090_1280.jpg'
    WHEN [id] = 2 THEN 'https://cdn.pixabay.com/photo/2020/08/27/07/31/restaurant-5521372_640.jpg'
    WHEN [id] = 3 THEN 'https://cdn.pixabay.com/photo/2023/10/04/20/31/sunrise-8294459_1280.jpg'
    WHEN [id] = 4 THEN 'https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_1280.jpg'    
END;

INSERT INTO [FoodDeliveryDB].[dbo].[Restaurants] 
    ([owner_id], [name], [phone_number], [rating], [opening_time], [closing_time], [is_approved], [is_active], [created_at], [image_url])
VALUES 
    (12, 'Pasta Palace', '9876234516', 4.5, '09:00', '22:00', 1, 1, GETDATE(), 'https://cdn.pixabay.com/photo/2020/09/01/21/19/palace-5536801_1280.jpg'),
    (13, 'Burger Bistro', '7876234516', 4.2, '11:00', '23:00', 1, 1, GETDATE(), 'https://cdn.pixabay.com/photo/2023/08/22/08/45/restaurant-8205743_960_720.jpg'),
    (13, 'Sushi Spot', '9876232345', 4.7, '10:00', '21:00', 1, 1, GETDATE(), 'https://cdn.pixabay.com/photo/2022/03/04/00/47/wine-7046276_640.jpg'),
    (14, 'Taco Town', '9809874516', 4.3, '10:30', '23:30', 1, 1, GETDATE(), 'https://cdn.pixabay.com/photo/2017/07/08/16/33/taco-2484868_640.jpg'),
    (15, 'Pizza Mania', '7887623410', 4.8, '08:00', '22:00', 1, 1, GETDATE(), 'https://cdn.pixabay.com/photo/2018/03/07/18/42/menu-3206749_640.jpg');

  INSERT INTO RestaurantCuisines (restaurant_id, cuisine_id) VALUES
(4,1),(4,2),(4,3),(4,4),
  (5,3),(5,4),
  (6,4),
  (7,4),
  (8,4);
	 



-- ###########################################################         SELECTION QUERIES


SELECT * FROM Users;

SELECT * FROM Admins;

SELECT * FROM Addresses;

SELECT * FROM Restaurants;

SELECT * FROM Cuisines;

SELECT * FROM Categories;

SELECT * FROM RestaurantCuisines;

SELECT * FROM FoodItems;

SELECT * FROM Orders;

SELECT * FROM OrderItems;

SELECT * FROM Reviews;

SELECT * FROM DeliveryPartners;

SELECT * FROM DeliveryRequest;

SELECT * FROM Coupons;

SELECT * FROM Disputes;

SELECT * FROM Notifications;

SELECT * FROM Logs;

SELECT * FROM Roles;
