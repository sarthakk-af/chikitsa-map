import { Request, Response } from 'express';
import users from '../schemas/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Load JWT secret
const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing in environment variables.");
}

//===================
//Get all users
//==================
export const getAllUsers = async (req:Request , res:Response):Promise<any> => {
    try{
        const allUsers = await users.find()
        console.log(` Found ${allUsers.length} users`);
        return res.status(200).json(allUsers);

    }catch(error){
        return res.status(500).json({error:"There is some error fetching users"});
    }
}

// ==============================
// REGISTER USER
// @route POST /api/users/register
// ==============================
export const registerUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, gender, phone, age, address, city, password } = req.body;

        console.log("📩 New registration attempt:", { name, email });

        // Validate all fields
        if (!name || !email || !gender || !phone || !age || !address || !city || !password) {
            return res.status(400).json({ message: "Please fill in all the fields." });
        }

        // Check if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new users({
            name,
            age,
            phone,
            gender,
            email,
            address,
            city,
            password: hashedPassword
        });

        await newUser.save();

        console.log("✅ User registered successfully:", newUser.email);
        return res.status(201).json({ message: "User registered successfully." });

    } catch (error) {
        console.error("❌ Error in registerUser:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// ==============================
// LOGIN USER
// @route POST /api/users/login
// ==============================
export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        console.log("📩 Login attempt:", { email });

        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find user and include password (if select: false in schema)
        const user = await users.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: "User not found with this email." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        console.log("✅ Login successful:", email);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("❌ Error in loginUser:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};
