import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  _id:mongoose.Types.ObjectId;
  name: string;
  age: number;
  specialization: string;
  hospitals: mongoose.Types.ObjectId[];
  experienceYears: number;
  qualifications: string[];
  availableDays: string[];
  timings: { day: string; from: string; to: string }[];
  isAvailable: boolean;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const doctorSchema: Schema<IDoctor> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [40, 'Name can be up to 40 characters'],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [20, 'Age must be at least 20'],
      max: [100, 'Age must be below 100'],
    },

    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      minlength: [3, 'Specialization must be at least 3 characters'],
      maxlength: [100, 'Specialization can be up to 100 characters'],
      trim: true,
    },

    hospitals: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Hospital',
      },
    ],

    experienceYears: {
      type: Number,
      required: [true, 'Experience is required'],
      min: [0, 'Experience must be at least 0 years'],
      max: [75, 'Experience seems too high'],
    },

    qualifications: {
      type: [String],
      required: [true, 'Qualifications are required'],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: 'At least one qualification is required',
      },
    },

    availableDays: {
      type: [String],
      required: [true, 'Available days are required'],
      validate: {
        validator: (arr: string[]) =>
          arr.every((day) =>
            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(day)
          ),
        message: 'Available days must be valid weekdays',
      },
    },

    timings: {
      type: [
        {
          day: {
            type: String,
            required: true,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          },
          from: {
            type: String,
            required: true,
            match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid "from" time (use HH:MM 24h format)'],
          },
          to: {
            type: String,
            required: true,
            match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid "to" time (use HH:MM 24h format)'],
          },
        },
      ],
      required: [true, 'Timings are required'],
      validate: {
        validator: (arr: any[]) => arr.length > 0,
        message: 'At least one timing is required',
      },
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    profileImage: {
      type: String,
      match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/, 'Profile image must be a valid image URL'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDoctor>('Doctor', doctorSchema);
