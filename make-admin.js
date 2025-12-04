import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userModel from './models/userModel.js';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

// Make user admin
const makeAdmin = async () => {
    try {
        await connectDB();

        // List all users first
        const users = await userModel.find({}).select('-password');

        if (users.length === 0) {
            console.log('📭 No users found. Please register a user first.');
            process.exit(0);
        }

        console.log('📋 Available users:\n');
        users.forEach((user, index) => {
            const roleIcon = user.role === 1 ? '👑' : '👤';
            const roleText = user.role === 1 ? 'ADMIN' : 'USER';
            console.log(`${index + 1}. ${roleIcon} ${user.name} (${user.email}) - ${roleText}`);
        });

        rl.question('\n🔢 Enter the number of user to make admin (or email): ', async (answer) => {
            let user;

            // Check if input is a number (index) or email
            if (!isNaN(answer)) {
                const index = parseInt(answer) - 1;
                if (index >= 0 && index < users.length) {
                    user = users[index];
                }
            } else {
                user = users.find(u => u.email === answer);
            }

            if (!user) {
                console.log('❌ Invalid selection');
                rl.close();
                process.exit(1);
            }

            if (user.role === 1) {
                console.log(`\n⚠️  ${user.name} is already an admin!`);
            } else {
                // Update user to admin
                await userModel.findByIdAndUpdate(user._id, { role: 1 });
                console.log(`\n✅ ${user.name} is now an admin!`);
                console.log(`📧 Email: ${user.email}`);
                console.log(`\n🔐 Login credentials:`);
                console.log(`   Email: ${user.email}`);
                console.log(`   Password: [Use the password you set during registration]`);
            }

            rl.close();
            process.exit(0);
        });

    } catch (error) {
        console.log('❌ Error:', error);
        rl.close();
        process.exit(1);
    }
};

makeAdmin();
