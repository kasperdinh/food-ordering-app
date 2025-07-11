-- Seed data for the food ordering app
USE foodorder;

-- Insert categories
INSERT INTO categories (name, description, image_url) VALUES
('Pizza', 'Delicious handcrafted pizzas', '/placeholder.svg?height=200&width=300'),
('Burgers', 'Juicy gourmet burgers', '/placeholder.svg?height=200&width=300'),
('Pasta', 'Fresh Italian pasta dishes', '/placeholder.svg?height=200&width=300'),
('Salads', 'Fresh and healthy salads', '/placeholder.svg?height=200&width=300'),
('Desserts', 'Sweet treats and desserts', '/placeholder.svg?height=200&width=300'),
('Beverages', 'Refreshing drinks', '/placeholder.svg?height=200&width=300');

-- Insert food items
INSERT INTO food_items (name, description, price, image_url, category_id, preparation_time) VALUES
-- Pizzas
('Margherita Pizza', 'Classic pizza with tomato sauce, mozzarella, and fresh basil', 12.99, '/placeholder.svg?height=200&width=300', 1, 20),
('Pepperoni Pizza', 'Traditional pizza with pepperoni and mozzarella cheese', 14.99, '/placeholder.svg?height=200&width=300', 1, 20),
('Supreme Pizza', 'Loaded with pepperoni, sausage, peppers, onions, and mushrooms', 18.99, '/placeholder.svg?height=200&width=300', 1, 25),

-- Burgers
('Classic Cheeseburger', 'Beef patty with cheese, lettuce, tomato, and special sauce', 9.99, '/placeholder.svg?height=200&width=300', 2, 15),
('BBQ Bacon Burger', 'Beef patty with BBQ sauce, bacon, and onion rings', 12.99, '/placeholder.svg?height=200&width=300', 2, 18),
('Veggie Burger', 'Plant-based patty with avocado and fresh vegetables', 10.99, '/placeholder.svg?height=200&width=300', 2, 12),

-- Pasta
('Spaghetti Carbonara', 'Creamy pasta with bacon, eggs, and parmesan cheese', 13.99, '/placeholder.svg?height=200&width=300', 3, 15),
('Chicken Alfredo', 'Fettuccine with grilled chicken in creamy alfredo sauce', 15.99, '/placeholder.svg?height=200&width=300', 3, 18),
('Penne Arrabbiata', 'Spicy tomato sauce with garlic and red peppers', 11.99, '/placeholder.svg?height=200&width=300', 3, 12),

-- Salads
('Caesar Salad', 'Romaine lettuce with caesar dressing, croutons, and parmesan', 8.99, '/placeholder.svg?height=200&width=300', 4, 8),
('Greek Salad', 'Mixed greens with feta cheese, olives, and greek dressing', 9.99, '/placeholder.svg?height=200&width=300', 4, 8),

-- Desserts
('Chocolate Cake', 'Rich chocolate cake with chocolate frosting', 6.99, '/placeholder.svg?height=200&width=300', 5, 5),
('Tiramisu', 'Classic Italian dessert with coffee and mascarpone', 7.99, '/placeholder.svg?height=200&width=300', 5, 5),

-- Beverages
('Coca Cola', 'Classic soft drink', 2.99, '/placeholder.svg?height=200&width=300', 6, 2),
('Fresh Orange Juice', 'Freshly squeezed orange juice', 3.99, '/placeholder.svg?height=200&width=300', 6, 3),
('Coffee', 'Freshly brewed coffee', 2.49, '/placeholder.svg?height=200&width=300', 6, 5);
