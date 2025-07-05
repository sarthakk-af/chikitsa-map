import mongoose, { Document, Schema } from 'mongoose';

export interface IHospital extends Document {
  name: string;
  type: string;
  address: string;
  city: string;
  phone: string;
  timetable: string;
  medicationsOffered: string[];
  doctors: mongoose.Types.ObjectId[]; // ← reference to Doctor model
  specialists: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const hospitalSchema: Schema<IHospital> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Hospital name is required'],
      minlength: [3, 'Hospital name must be at least 3 characters'],
      maxlength: [50, 'Hospital name can be up to 50 characters'],
      trim: true,
    },

    type: {
      type: String,
      required: [true, 'Hospital type is required'],
      enum: {
        values: ['Government', 'Private', 'Clinic', 'Charitable', 'Multispeciality'],
        message: 'Type must be Government, Private, Clinic, Charitable, or Multispeciality',
      },
    },

    address: {
      type: String,
      required: [true, 'Address is required'],
      minlength: [10, 'Address must be at least 10 characters'],
      maxlength: [100, 'Address can be up to 100 characters'],
    },

    city: {
      type: String,
      required: [true, 'City is required'],
      minlength: [3, 'City name must be at least 3 characters'],
      maxlength: [30, 'City name can be up to 30 characters'],
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number'],
    },

    timetable: {
      type: String,
      required: [true, 'Timetable is required'],
      minlength: [5, 'Timetable should be descriptive (e.g., 8 AM - 5 PM)'],
      maxlength: [100, 'Timetable can be up to 100 characters'],
    },

    medicationsOffered: {
      type: [String],
      required: [true, 'At least one medication should be listed'],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: 'Must list at least one medication',
      },
    },

    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'At least one doctor reference is required'],
      },
    ],

    specialists: {
      type: [String],
      required: [true, 'Specialists list is required'],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: 'Must list at least one specialist',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IHospital>('Hospitals', hospitalSchema);
