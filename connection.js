import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



export const connectMongoDB = async () => {
    try {
        const mongodbUri = process.env.MONGODB_URI;
        if (!mongodbUri) {
            throw new Error('Missing environment variable MONGODB_URI');
        }

        await mongoose.connect(mongodbUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
}