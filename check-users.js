import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userModel from './models/userModel.js';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ Connected to MongoDB\n');
    } catch (error) {
        console.log('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// List all users
const listUsers = async () => {
    try {
        await connectDB();

        const users = await userModel.find({}).select('-password');

        if (users.length === 0) {
            console.log('📭 No users found in database');
        } else {
            console.log(`📋 Found ${users.length} user(s):\n`);
            console.log('═══════════════════════════════════════════════════════════');

            users.forEach((user, index) => {
                console.log(`\n${index + 1}. ${user.name}`);
                console.log(`   📧 Email: ${user.email}`);
                console.log(`   📱 Phone: ${user.phone}`);
                console.log(`   🏠 Address: ${user.address}`);
                console.log(`   👤 Role: ${user.role === 1 ? '👑 ADMIN' : '👤 USER'}`);
                console.log(`   📅 Created: ${user.createdAt}`);
            });

            console.log('\n═══════════════════════════════════════════════════════════');

            const adminCount = users.filter(u => u.role === 1).length;
            const userCount = users.filter(u => u.role === 0).length;

            console.log(`\n📊 Summary:`);
            console.log(`   Total Users: ${users.length}`);
            console.log(`   Admins: ${adminCount}`);
            console.log(`   Regular Users: ${userCount}`);
        }

        process.exit(0);
    } catch (error) {
        console.log('❌ Error listing users:', error);
        process.exit(1);
    }
};

listUsers();
