import mongoose, { Schema, Document } from 'mongoose';

interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const adminSchema: Schema<IAdmin> = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be atleast 2 characters'],
        maxlength: [20, 'Name cannot exceed 20 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be atleast 6 characters'],
        maxlength: [20, 'Password cannot exceed 20 characters'],
        select:false,
    },
},
    {
        timestamps: true,
    });
export default mongoose.model<IAdmin>('Admins', adminSchema);