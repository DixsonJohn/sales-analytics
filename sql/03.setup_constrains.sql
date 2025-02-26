USE sales_db;

-- Add indexes for faster queries
CREATE INDEX idx_orders_date ON Orders (dateOfSale);
CREATE INDEX idx_orders_region ON Orders (region);
CREATE INDEX idx_orderitems_product ON OrderItems (productId);
CREATE INDEX idx_orderitems_order ON OrderItems (orderId);