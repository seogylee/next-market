import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://seogylee:2jbLhU0aQfJgCEIB@cluster0.ero2ug1.mongodb.net/nextAppDB?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Success: MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("MongoDB connection failed");
    }
};

export default connectDB;
