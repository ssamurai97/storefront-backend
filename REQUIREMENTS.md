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

products

|Columns|Types|
:---|---------|
id|SERIAL PRIMARY KEY
name|VARCHAR(150) NOT NULL
price|NUMBER NOT NULL
category| VARCHAR(150) NOT NULL


Users 

|Columns|Types|
|-------|-----|
id| SERIAL PRIMARY KEY
first_name|VARCHAR(255) NOT NULL
last_name| VARCHAR(255) NOT NULL
password| VARCHAR NOT NULL


Orders

|Columns| Types|
|-------|------|
id| SERIAL PRIMARY KEY
status(active or complete) | VARCHAR(100) 
user_id |int REFERENCES users(id) ON DELETE CASCADE
