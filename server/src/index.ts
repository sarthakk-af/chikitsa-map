import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes';
import adminsRoutes from './routes/adminsRoutes';
import hospitalsRoutes from './routes/hospitalsRoutes';
import doctorsRoutes from './routes/doctorsRoutes'
import cors from 'cors';


dotenv.config(); // ✅ Load environment variables at the very top

const app = express();


app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));


// ✅ Parse incoming JSON
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URL!;

if (!MONGO_URI) {
  console.error("❌ MongoDB URI not provided in .env");
  process.exit(1); // Stop the server if config is missing
}

// ✅ Sample root route
app.get('/', (req, res) => {
  res.send("🌐 Welcome to Chikitsa Map Server");
});

// ✅ related routes
app.use('/api/users', usersRoutes);
app.use('/api/admins', adminsRoutes);
app.use('/api/hospitals',hospitalsRoutes);
app.use('/api/doctors',doctorsRoutes);

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
    
    // ✅ Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

connectDB();
