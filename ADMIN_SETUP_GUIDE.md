# Admin Account Setup Guide

## Method 1: Using Node.js Script (Recommended)

1. **Run the admin creation script:**
   ```cmd
   node create-admin.js
   ```

2. **Login credentials:**
   - Email: `admin@example.com`
   - Password: `admin123`

3. **Login on your website:**
   - Go to `/login`
   - Enter the credentials above
   - You'll be redirected to admin dashboard

---

## Method 2: Register and Update in MongoDB

### Step 1: Register a New User
1. Go to your website: `http://localhost:3000/register`
2. Fill in the registration form:
   - Name: Admin User
   - Email: admin@example.com
   - Password: admin123
   - Phone: 1234567890
   - Address: Admin Address
   - Security Answer: admin
3. Click Register

### Step 2: Update User to Admin in MongoDB

**Option A: Using MongoDB Compass (GUI)**
1. Open MongoDB Compass
2. Connect to: `mongodb+srv://PriyaDevadig:p1r2i3y4@cluster0.zal4pvq.mongodb.net/ecommerce`
3. Navigate to `ecommerce` database → `users` collection
4. Find the user with email `admin@example.com`
5. Click Edit
6. Change `role` from `0` to `1`
7. Click Update

**Option B: Using MongoDB Shell**
```javascript
// Connect to MongoDB
mongosh "mongodb+srv://PriyaDevadig:p1r2i3y4@cluster0.zal4pvq.mongodb.net/ecommerce"

// Update user to admin
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: 1 } }
)

// Verify the update
db.users.findOne({ email: "admin@example.com" })
```

**Option C: Using Node.js Console**
```javascript
// In your project root, run: node

const mongoose = require('mongoose');
const userModel = require('./models/userModel.js');

mongoose.connect('mongodb+srv://PriyaDevadig:p1r2i3y4@cluster0.zal4pvq.mongodb.net/ecommerce')
  .then(async () => {
    const user = await userModel.findOne({ email: 'admin@example.com' });
    user.role = 1;
    await user.save();
    console.log('Admin created!');
    process.exit();
  });
```

---

## Method 3: Quick Update Existing User

If you already have a registered user and want to make them admin:

1. **Run this command in your terminal:**
   ```cmd
   node -e "import('mongoose').then(m => m.default.connect('mongodb+srv://PriyaDevadig:p1r2i3y4@cluster0.zal4pvq.mongodb.net/ecommerce').then(() => import('./models/userModel.js').then(u => u.default.findOneAndUpdate({email: 'YOUR_EMAIL@example.com'}, {role: 1}).then(() => {console.log('Admin updated!'); process.exit()}))))"
   ```
   Replace `YOUR_EMAIL@example.com` with your actual email.

---

## Verify Admin Access

### Test in Browser:
1. Login with admin credentials
2. Try to access: `http://localhost:3000/dashboard/admin`
3. You should see the admin dashboard

### Test with API:
```javascript
// In browser console after login
fetch('http://localhost:8080/api/v1/auth/admin-auth', {
  headers: {
    'Authorization': localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : ''
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
// Should return: { ok: true }
```

---

## Default Admin Credentials

After running `create-admin.js`:
- **Email:** admin@example.com
- **Password:** admin123
- **Role:** 1 (Admin)

---

## Understanding User Roles

In your database, the `role` field determines access:
- `role: 0` = Regular User (can shop, view orders)
- `role: 1` = Admin (can manage products, categories, all orders)

---

## Troubleshooting

### "User not found" error:
- Make sure you registered the user first
- Check the email is correct

### "Not authorized" error:
- Verify `role` is set to `1` in database
- Clear browser cache and login again
- Check token is being sent in requests

### Can't access admin routes:
- Check `authMiddleware.js` - `isAdmin` function
- Verify JWT token contains correct user data
- Check browser console for errors

---

## Security Note

⚠️ **Important:** Change the default admin password after first login!

Go to: Dashboard → Profile → Update Password
