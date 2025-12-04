import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
//import {fileURLToPath} from 'url'

import path from 'path'

dotenv.config();
connectDB();
//const __filename=fileURLToPath(import.meta.url);
//const __dirname=path.dirname(__filename);
const app = express();

app.use(cors({
    origin: ['https://priya-3004-coder.github.io', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
//app.use(express.static(path.join(__dirname,'./client/build')))

app.use('/api/v1/auth', authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use('/api/v1/product', productRoutes)

//app.use('*',function(req,res){
// res.sendFile(path.join(__dirname,'./client/build/index.html'));
//});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Ecommerce App</h1>");
});
const PORT = process.env.PORT || 8080;

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
    });
}

// Export for Vercel
export default app;