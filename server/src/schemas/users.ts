import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be atleast 2 characters'],
        maxlength: [30, 'Name cannot exceed 30 characters'],
        trims: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [10, 'Age cannot be below 10'],
        max: [120, 'Age cannot exceed 120']
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: 'Gender must be Male , Female or Other'
        },
        required: [true, 'Gender is required']
    },
    phone: {
        type: String,
        match: [/^[0-9]{10}$/, 'Enter valid 10-digit phone number'],
        required: [true, 'Phone number is required'],
        unique: true
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Enter valid email'],
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        minlength: [10, 'Address must be atleast 5 characters'],
        maxlength: [100, 'Address cannot exceed 100 characters']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        minlength: [3, 'City must be atleast 3 characters'],
        maxlength: [20, 'City cannot exceed 20 characters'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be atleast 6 characters'],
        maxlength: [50, 'Password cannot exceed 50 characters'],
        select:false,
    },
},
    {
        timestamps: true,
    }
);
export default mongoose.model<IUser>('Users', userSchema);