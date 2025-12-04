import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userModel from './models/userModel.js';
import { hashPassword } from './helpers/authHelper.js';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.log('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Create Admin User
const createAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await userModel.findOne({ email: 'admin@example.com' });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('Email:', existingAdmin.email);
            console.log('Name:', existingAdmin.name);
            console.log('Role:', existingAdmin.role === 1 ? 'Admin' : 'User');

            // Update to admin if not already
            if (existingAdmin.role !== 1) {
                existingAdmin.role = 1;
                await existingAdmin.save();
                console.log('✅ User updated to Admin role');
            }
        } else {
            // Create new admin user
            const hashedPassword = await hashPassword('admin123');

            const admin = new userModel({
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                phone: '1234567890',
                address: 'Admin Address',
                answer: 'admin',
                role: 1 // 1 = Admin, 0 = Regular User
            });

            await admin.save();
            console.log('✅ Admin user created successfully!');
            console.log('📧 Email: admin@example.com');
            console.log('🔑 Password: admin123');
        }

        process.exit(0);
    } catch (error) {
        console.log('❌ Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
