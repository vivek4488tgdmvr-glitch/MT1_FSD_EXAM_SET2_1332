
# Product Inventory Management API

## Project Information

**Project Name:** Product Inventory Management API  
**Student Name:** Vivek Kumar  
**Roll Number:** 2500320101332  
**Course:** B.Tech  
**Department:** Computer Science and Engineering  

---

## 1. Introduction

The Product Inventory Management API is a RESTful API developed using Node.js and Express.js.

It allows users to manage product records through different HTTP methods. The application stores all product information in an in-memory JavaScript array without using any external database.

## 2. Technologies Used

- Node.js
- Express.js
- JavaScript
- Postman
- Visual Studio Code

## 3. Project Structure

```text
ProductInventoryManagementAPI/
│
├── package.json
├── package-lock.json
├── server.js
├── httpServer.js
├── expressApp.js
│
└── screenshots/
```

## 4. Installation and Setup

### Step 1: Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Open the project folder

```bash
cd ProductInventoryManagementAPI
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the server

```bash
npm start
```

The server runs on:

```text
http://localhost:3000
```

## 5. API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | /api/products | Get all products |
| POST | /api/products | Add a new product |
| GET | /api/products/:id | Get product by ID |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| GET | /api/products/filter?category=Electronics | Filter products by category |

## 6. Product Data Structure

Each product contains the following fields:

| Field | Data Type | Description |
|---|---|---|
| id | Number | Unique product ID |
| name | String | Product name |
| category | String | Product category |
| price | Number | Product price |
| quantity | Number | Available quantity |
| inStock | Boolean | Product availability |

## 7. Initial Product Records

The application starts with three products:

| ID | Product | Category | Price | Quantity | In Stock |
|---|---|---|---:|---:|---|
| 301 | Wireless Mouse | Electronics | 799 | 25 | Yes |
| 302 | Notebook | Stationery | 60 | 100 | Yes |
| 303 | USB Keyboard | Electronics | 999 | 0 | No |

## 8. Sample POST Request

**Endpoint:**

```text
POST /api/products
```

**JSON Body:**

```json
{
    "name": "Water Bottle",
    "category": "Accessories",
    "price": 299,
    "quantity": 40,
    "inStock": true
}
```

## 9. HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Product created successfully |
| 400 | Invalid request or input |
| 404 | Product or endpoint not found |
| 500 | Internal server error |

## 10. Validation

The API validates product information before creating or updating records.

- Product name must not be empty.
- Category must not be empty.
- Price must be a valid non-negative number.
- Quantity must be a non-negative integer.
- inStock must be a Boolean value.

Category filtering is case-insensitive.

## 11. Data Storage

All product records are stored in a JavaScript array in server memory.

No external database such as MongoDB or MySQL is used, as specified in the assignment.

**Note:** Data is temporary and resets when the server restarts.

## 12. Testing

The API endpoints can be tested using:

- Postman
- Thunder Client

Test both successful and unsuccessful requests and verify the returned JSON responses and HTTP status codes.

## 13. Conclusion

This project demonstrates the implementation of REST API operations using Node.js and Express.js.

It covers CRUD operations, request handling, input validation, filtering, HTTP status codes, and in-memory data management.

---

## Student Details

**Name:** Vivek Kumar  
**Roll Number:** 2500320101332  
**Project:** Product Inventory Management API

---
