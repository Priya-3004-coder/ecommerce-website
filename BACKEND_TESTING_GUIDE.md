# Backend API Testing Guide

## Prerequisites
- Backend server running on `http://localhost:8080`
- MongoDB connected
- Admin account created

---

## 🔐 Authentication APIs

### 1. Register User
```bash
curl -X POST http://localhost:8080/api/v1/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"123456\",\"phone\":\"1234567890\",\"address\":\"Test Address\",\"answer\":\"test\"}"
```

### 2. Login User
```bash
curl -X POST http://localhost:8080/api/v1/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"123456\"}"
```
**Save the token from response for authenticated requests!**

### 3. Check User Auth
```bash
curl -X GET http://localhost:8080/api/v1/auth/user-auth ^
  -H "Authorization: YOUR_TOKEN_HERE"
```

---

## 📦 Category CRUD Operations

### 1. Create Category (Admin Only)
```bash
curl -X POST http://localhost:8080/api/v1/category/create-category ^
  -H "Content-Type: application/json" ^
  -H "Authorization: YOUR_ADMIN_TOKEN" ^
  -d "{\"name\":\"Electronics\"}"
```

### 2. Get All Categories
```bash
curl -X GET http://localhost:8080/api/v1/category/get-category
```

### 3. Get Single Category
```bash
curl -X GET http://localhost:8080/api/v1/category/single-category/electronics
```

### 4. Update Category (Admin Only)
```bash
curl -X PUT http://localhost:8080/api/v1/category/update-category/CATEGORY_ID ^
  -H "Content-Type: application/json" ^
  -H "Authorization: YOUR_ADMIN_TOKEN" ^
  -d "{\"name\":\"Updated Electronics\"}"
```

### 5. Delete Category (Admin Only)
```bash
curl -X DELETE http://localhost:8080/api/v1/category/delete-category/CATEGORY_ID ^
  -H "Authorization: YOUR_ADMIN_TOKEN"
```

---

## 🛍️ Product CRUD Operations

### 1. Create Product (Admin Only)
**Note: Use form-data for file upload. Use Postman or Thunder Client for this.**

**Postman Steps:**
- Method: POST
- URL: `http://localhost:8080/api/v1/product/create-product`
- Headers: `Authorization: YOUR_ADMIN_TOKEN`
- Body: form-data
  - name: "Test Product"
  - description: "Test Description"
  - price: 99
  - category: CATEGORY_ID
  - quantity: 10
  - shipping: true
  - photo: [Select Image File]

### 2. Get All Products
```bash
curl -X GET http://localhost:8080/api/v1/product/get-product
```

### 3. Get Single Product
```bash
curl -X GET http://localhost:8080/api/v1/product/get-product/test-product
```

### 4. Get Product Photo
```bash
curl -X GET http://localhost:8080/api/v1/product/product-photo/PRODUCT_ID
```

### 5. Update Product (Admin Only)
**Use Postman with form-data (same as create)**
- Method: PUT
- URL: `http://localhost:8080/api/v1/product/update-product/PRODUCT_ID`

### 6. Delete Product (Admin Only)
```bash
curl -X DELETE http://localhost:8080/api/v1/product/delete-product/PRODUCT_ID ^
  -H "Authorization: YOUR_ADMIN_TOKEN"
```

### 7. Search Products
```bash
curl -X GET http://localhost:8080/api/v1/product/search/laptop
```

### 8. Filter Products
```bash
curl -X POST http://localhost:8080/api/v1/product/product-filters ^
  -H "Content-Type: application/json" ^
  -d "{\"checked\":[],\"radio\":[0,100]}"
```

### 9. Get Product Count
```bash
curl -X GET http://localhost:8080/api/v1/product/product-count
```

### 10. Get Products with Pagination
```bash
curl -X GET http://localhost:8080/api/v1/product/product-list/1
```

### 11. Get Related Products
```bash
curl -X GET http://localhost:8080/api/v1/product/related-product/PRODUCT_ID/CATEGORY_ID
```

---

## 💳 Payment APIs

### 1. Get Braintree Token
```bash
curl -X GET http://localhost:8080/api/v1/product/braintree/token
```

### 2. Process Payment (Requires Auth)
```bash
curl -X POST http://localhost:8080/api/v1/product/braintree/payment ^
  -H "Content-Type: application/json" ^
  -H "Authorization: YOUR_TOKEN" ^
  -d "{\"cart\":[{\"_id\":\"PRODUCT_ID\",\"price\":99}],\"nonce\":\"fake-valid-nonce\"}"
```

---

## 📋 Order APIs

### 1. Get User Orders
```bash
curl -X GET http://localhost:8080/api/v1/auth/orders ^
  -H "Authorization: YOUR_TOKEN"
```

### 2. Get All Orders (Admin Only)
```bash
curl -X GET http://localhost:8080/api/v1/auth/all-orders ^
  -H "Authorization: YOUR_ADMIN_TOKEN"
```

### 3. Update Order Status (Admin Only)
```bash
curl -X PUT http://localhost:8080/api/v1/auth/order-status/ORDER_ID ^
  -H "Content-Type: application/json" ^
  -H "Authorization: YOUR_ADMIN_TOKEN" ^
  -d "{\"status\":\"Processing\"}"
```

---

## 🧪 Testing with Browser/Postman

### Using Browser Console (for GET requests):
```javascript
// Test Get All Products
fetch('http://localhost:8080/api/v1/product/get-product')
  .then(res => res.json())
  .then(data => console.log(data))

// Test with Auth
fetch('http://localhost:8080/api/v1/auth/user-auth', {
  headers: {
    'Authorization': 'YOUR_TOKEN_HERE'
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
```

### Using Postman/Thunder Client:
1. Install Postman or Thunder Client (VS Code extension)
2. Import the endpoints above
3. Set Authorization header for protected routes
4. Test each endpoint

---

## ✅ Quick Test Checklist

- [ ] User Registration works
- [ ] User Login works and returns token
- [ ] Create Category (admin)
- [ ] Get All Categories
- [ ] Update Category (admin)
- [ ] Delete Category (admin)
- [ ] Create Product (admin)
- [ ] Get All Products
- [ ] Get Single Product
- [ ] Update Product (admin)
- [ ] Delete Product (admin)
- [ ] Search Products
- [ ] Filter Products
- [ ] Get Product Count
- [ ] Pagination works
- [ ] Payment token generation
- [ ] Order creation
- [ ] Get user orders
- [ ] Update order status (admin)

---

## 🔍 Check Database Directly

Connect to MongoDB and verify:
```javascript
// In MongoDB Compass or Shell
use ecommerce

// Check users
db.users.find()

// Check categories
db.categories.find()

// Check products
db.products.find()

// Check orders
db.orders.find()
```

---

## 🚨 Common Issues

1. **401 Unauthorized**: Token expired or invalid
2. **403 Forbidden**: User is not admin
3. **500 Server Error**: Check backend console logs
4. **MongoDB Connection**: Ensure MongoDB is running

---

## 📝 Notes

- Replace `YOUR_TOKEN_HERE` with actual JWT token from login
- Replace `YOUR_ADMIN_TOKEN` with admin user's JWT token
- Replace `PRODUCT_ID`, `CATEGORY_ID`, `ORDER_ID` with actual IDs
- For Windows CMD, use `^` for line continuation
- For PowerShell, use `` ` `` for line continuation
- For Linux/Mac, use `\` for line continuation
