import { Request, Response } from 'express';
import admins from '../schemas/admins';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Load JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is not set in the environment variables.");
}

// ==============================
// REGISTER ADMIN CONTROLLER
// ==============================
export const registerAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body;

        console.log("🔐 Incoming registration request:", { name, email });

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all the fields." });
        }

        // Check if admin already exists
        const existingAdmin = await admins.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists with this email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new admins({
            name,
            email,
            password: hashedPassword
        });

        // Save to database
        await newAdmin.save();

        console.log("✅ Admin registered successfully:", newAdmin.email);
        return res.status(201).json({ message: "Admin registered successfully." });

    } catch (error) {
        console.error("❌ Error in registerAdmin:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// ==============================
// LOGIN ADMIN CONTROLLER
// ==============================
export const loginAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        console.log("🔐 Incoming login request:", { email });

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all the fields." });
        }

        // Find admin and include password field (it's excluded by default)
        const admin = await admins.findOne({ email }).select('+password');
        if (!admin) {
            return res.status(400).json({ message: "No admin found with this email." });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email,role:'admin' },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        console.log("✅ Admin logged in:", admin.email);

        return res.status(200).json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        console.error("❌ Error in loginAdmin:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};
