import { Request, Response } from 'express';
import doctors from '../schemas/doctors';
import hospitalsModel from '../schemas/hospitals'; // Renamed to avoid name conflict with hospitals array
import mongoose from 'mongoose';

// =====================
// Add Doctor Controller
// =====================

export const addDoctor = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      name,
      age,
      specialization,
      hospitals,
      experienceYears,
      qualifications,
      availableDays,
      timings,
      isAvailable,
      profileImage,
    } = req.body;

    console.log("Incoming add doctor request:", req.body);

    // Required field validation
    if (
      !name ||
      !age ||
      !specialization ||
      !hospitals ||
      !experienceYears ||
      !qualifications ||
      !availableDays ||
      !timings ||
      typeof isAvailable !== 'boolean'
    ) {
      console.warn("❌ Missing required fields");
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // if (!Array.isArray(hospitals) || hospitals.length === 0) {
    //   console.warn("❌ Hospital list is empty or invalid");
    //   return res.status(400).json({ error: "At least one hospital is required." });
    // }

    // // Validate hospital IDs
    // const validHospitals = await hospitalsModel.find({
    //   _id: { $in: hospitals }
    // });

    // if (validHospitals.length !== hospitals.length) {
    //   console.warn("❌ Some hospital IDs are invalid");
    //   return res.status(400).json({ error: "One or more hospital IDs are invalid." });
    // }

    const doctor = new doctors({
      name,
      age,
      specialization,
      hospitals,
      experienceYears,
      qualifications,
      availableDays,
      timings,
      isAvailable,
      profileImage,
    });

    const savedDoctor = await doctor.save();
    console.log("✅ Doctor saved:", savedDoctor);

    return res.status(201).json({
      message: "Doctor saved successfully",
      doctor: savedDoctor,
    });

  } catch (error) {
    console.error("❌ Error in addDoctor:", error);
    return res.status(500).json({ error: "Error in adding doctor" });
  }
};

// =================
// Get All Doctors
// =================

export const getAllDoctors = async (req: Request, res: Response): Promise<any> => {
  try {
    const allDoctors = await doctors
      .find()
      //.populate('hospitals', 'name city');

    console.log(`✅ Found ${allDoctors.length} doctors`);
    return res.status(200).json(allDoctors);
  } catch (error) {
    console.error("❌ Error in getAllDoctors:", error);
    return res.status(500).json({ error: "Error getting all doctors data" });
  }
};

// =================
// Delete a Doctor
// =================

export const deleteDoctor = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn("❌ Invalid doctor ID format");
      return res.status(400).json({ error: "Invalid doctor ID" });
    }

    const deleted = await doctors.findByIdAndDelete(id);
    if (!deleted) {
      console.warn(`❌ Doctor with ID ${id} not found`);
      return res.status(404).json({ message: "Doctor not found" });
    }

    console.log(`✅ Doctor with ID ${id} deleted successfully`);
    return res.status(200).json({ message: "Doctor deleted successfully" });

  } catch (error) {
    console.error("❌ Error in deleteDoctor:", error);
    return res.status(500).json({ error: "Error deleting doctor" });
  }
};

// =================
// Update Doctor
// =================

export const updateDoctor = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn("❌ Invalid doctor ID format");
      return res.status(400).json({ error: "Invalid doctor ID" });
    }

    const updatedDoctor = await doctors.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoctor) {
      console.warn(`❌ Doctor with ID ${id} not found`);
      return res.status(404).json({ error: "Doctor not found" });
    }

    console.log(`✅ Doctor with ID ${id} updated successfully`);
    return res.status(200).json({
      message: "Doctor updated successfully",
      doctor: updatedDoctor,
    });

  } catch (error) {
    console.error("❌ Error in updateDoctor:", error);
    return res.status(500).json({ error: "Error updating doctor" });
  }
};
