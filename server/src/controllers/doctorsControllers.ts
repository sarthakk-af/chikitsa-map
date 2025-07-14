import { Request, Response } from 'express';
import doctorsModel from '../schemas/doctors';
import hospitalsModel, { IHospital } from '../schemas/hospitals'; // Renamed to avoid name conflict with hospitals array
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

    console.log("📥 Incoming doctor data:", req.body);

    // Required field validation
    if (
      !name ||
      !age ||
      !specialization ||
      !experienceYears === undefined ||
      !Array.isArray(qualifications) || qualifications.length === 0 ||
      !Array.isArray(availableDays) || availableDays.length === 0 ||
      !Array.isArray(timings) || timings.length === 0 ||
      typeof isAvailable !== 'boolean'
    ) {
      console.warn("❌ Missing required fields");
      return res.status(400).json({ error: "All required fields must be filled." });
    }


    // =========== Handle Hospital Input ===========
    let hospitalIds: mongoose.Types.ObjectId[] = [];

    if (Array.isArray(hospitals) && hospitals.length > 0) {
      const first = hospitals[0];

      //CASE;Array of objectids

      if (typeof first === 'string' && mongoose.Types.ObjectId.isValid(first)) {
        const foundHospitals = await hospitalsModel.find({ _id: { $in: hospitals } });

        if (foundHospitals.length !== hospitals.length) {
          console.warn("Some hospitals IDs are invalid");
          return res.status(400).json({ error: 'One or more hospital IDs are invalid.' });
        }
        hospitalIds = hospitals.map((id: string) => new mongoose.Types.ObjectId(id));
      }

      //CASE: Array of objects -> create new hospitals
      else if (typeof first === 'object') {
        for (const hosp of hospitals) {
          const requiredHospitalsFields = ['name', 'type', 'address', 'city', 'phone', 'timetable', 'medicationsOffered', 'specialists'];
          const hasRequiredFields = requiredHospitalsFields.every(field => hosp[field]);

          if (!hasRequiredFields) {
            return res.status(400).json({ error: 'Missing required fields for creating hospitals inline' });
          }
          const newHospital = new hospitalsModel(hosp);
          const savedHospital = await newHospital.save() as IHospital;
          hospitalIds.push(savedHospital._id as mongoose.Types.ObjectId);
          console.log(`Created new hospital : ${savedHospital.name}`);

        }
      }
      //CASE: invalid format
      else {
        console.warn('Invalid hospital format')
        return res.status(400).json({ error: 'Invalid format for hospitals field' });
      }

    }

    const newDoctor = new doctorsModel({
      name,
      age,
      specialization,
      hospitals: hospitalIds,
      experienceYears,
      qualifications,
      availableDays,
      timings,
      isAvailable,
      profileImage,
    });

    const savedDoctor = await newDoctor.save();
    console.log("✅ Doctor saved:", savedDoctor.name);

    // ========== Backlink to Hospitals ==========

    if (hospitals.length > 0) {
      await hospitalsModel.updateMany(
        { _id: { $in: hospitals } },
        { $addToSet: { doctors: savedDoctor._id } }
      );
      console.log('🔁 Linked doctor to hospitals');
    }

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
    const allDoctors = await doctorsModel
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

    const deleted = await doctorsModel.findByIdAndDelete(id);
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

    const updatedDoctor = await doctorsModel.findByIdAndUpdate(id, req.body, {
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
