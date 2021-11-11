#API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. I built the API that will support this application for its backend.

These are the descriptions that describe what endpoints the API needs to supply, as well as data shapes, schema the frontend and backend have agreed meet the requirements of the application.
##API Endpoints


Products
  * ProductIndex route: /products[GET]
  * showProduct route:/products:id [GET]
  * createProduct[token required] route:/products [POST]
  * deleteProduct(args: id) route :/products/:id[DELETE]
  * [OPTIONAL] products by category(args: Product category) route:/products/category/:category[GET]

Users

- index [token required] route:/users METHOD [GET] get users
- show(args: id)[token required] route:/users:id METHOD [GET] get user by ID

- create  route :/users [POST] create user
- authenticate route:/users/authenticate [POST] authenticate user


Orders

- orderIndex route:/orders get orders [GET]
- showOrder(args: id) route :/orders/:id [GET] 
- createOrder route:/orders [POST] create order
- deleteOrder(args: id) route:/:id [DELETE] delete order


#Data Shapes and Schema

### Table Products
                                     Table products
  Column  |          Type          | Collation | Nullable |               Default                
----------|------------------------|-----------|----------|--------------------------------------
 id       | integer                |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(150) |           | not null | 
 price    | integer                |           | not null | 
 category | character varying(150) |           |          | 
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)


## Table Users 

|  Column    |         Type            | Collation | Nullable  |                    
|------------|:------------------------:|:-----------|----------|
| id         | integer                |           | not null |
| first_name | character varying(255) |           | not null | 
| last_name  | character varying(255) |           | not null | 
| password   | character varying      |           | not null | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)



### Table Orders

                                   
 Column  |          Type          | Collation | Nullable |                        
|---------|------------------------|-----------|----------|
| id      | integer                |           | not null |
| user_id | integer                |           | not null | 
| status  | character varying(100) |           | not null | 
|Indexes|
    "orders_pkey" PRIMARY KEY, btree (id)
 Foreign-key constraints:
   "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
 Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)|


### Table order_products
|  Column|  Type   | Collation | Nullable |                
|--------|---------|-----------|--------
 id         | integer |           | not null | 
 quantity   | integer |           | not null | 
 order_id   | integer |           | not null | 
 product_id | integer |           | not null | 
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
