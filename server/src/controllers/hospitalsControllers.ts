import { Request, Response } from 'express';
import hospitalsModel from '../schemas/hospitals';
import doctorsModel from '../schemas/doctors'
import { IDoctor } from '../schemas/doctors';
import mongoose from 'mongoose';
import hospitals from '../schemas/hospitals';

// ==============================
// ADD HOSPITAL CONTROLLER 
// ==============================

export const addHospital = async (req: Request, res: Response): Promise<any> => {
    try {
        const {
            name,
            type,
            address,
            city,
            phone,
            timetable,
            medicationsOffered,
            doctors,
            specialists,
        } = req.body;

        console.log("📥 Incoming hospital data:", req.body);


        // Validate required fields
        if (!name ||
            !type ||
            !address ||
            !city ||
            !phone ||
            !timetable ||
            !Array.isArray(medicationsOffered) || medicationsOffered.length === 0 ||
            !Array.isArray(specialists) || specialists.length === 0) {
            console.error("❌ Missing required fields in request body");
            return res.status(400).json({ error: "Please fill all the required fields" });
        }


        const duplicate = await hospitalsModel.findOne({ name, address, phone });

        if (duplicate) {
            return res.status(400).json({ error: "Hospital with same name , address , phone no. already exists", });
        }

        //Handle doctors input


        let doctorIds: mongoose.Types.ObjectId[] = [];

        if (Array.isArray(doctors) && doctors.length > 0) {
            const first = doctors[0];
            //CAse:IDs provided

            if (typeof first === 'string' && mongoose.Types.ObjectId.isValid(first)) {
                const existingDoctors = await doctorsModel.find({ _id: { $in: doctors } });
                if (existingDoctors.length !== doctors.length) {
                    return res.status(400).json({ error: 'One or more IDs are invalid' })
                }
                doctorIds = doctors.map((id: string) => new mongoose.Types.ObjectId(id));
            }

            //Case :doctors creating on the spot

            else if (typeof first == 'object') {
                for (const doc of doctors) {
                    const requiredFields = ['name', 'age', 'specialization', 'experienceYears', 'qualifications', 'availableDays', 'timings', 'isAvailable'];

                    const isValid = requiredFields.every(field => doc[field] !== undefined);

                    if (isValid) {
                        return res.status(400).json({ error: 'Missing required fields in inline doctor object' });
                    }

                    //save doctor
                    const newDoctor = new doctorsModel({
                        ...doc,
                        hospitals: [],
                    });
                    const savedDoctor = await newDoctor.save() as IDoctor;
                    doctorIds.push(savedDoctor._id as mongoose.Types.ObjectId);
                    console.log(`Created new doctor ${savedDoctor.name}`);
                }
            }
            //CAse: invalid doctors format

            else {
                return res.status(400).json({ error: 'Invalid format for doctors field' });
            }

        }

        //save hospital to database
        const newHospital = new hospitalsModel({
            name,
            type,
            address,
            city,
            phone,
            timetable,
            medicationsOffered,
            doctors: doctorIds,
            specialists,
        });

        const savedHospital = await newHospital.save();
        console.log("✅ Hospital added successfully:", savedHospital.name);

        //Link hospital to doctors

        if (doctorIds.length > 0) {
            await doctorsModel.updateMany(
                { _id: { $in: doctorIds } },
                { $addToSet: { hospitals: savedHospital._id } }
            );
            console.log("🔁 Linked hospital to doctors");
        }

        return res.status(201).json({
            message: "Hopital added successfully",
            hospital: savedHospital
        });
    } catch (error) {
        console.error("Error in addHospital controller:", error);
        return res.status(500).json({ error: "Internal server error while adding hospital" });
    }
};

// ==============================
// GET ALL HOSPITALS CONTROLLER 
// ==============================

export const getAllHospitals = async (req: Request, res: Response): Promise<any> => {
    try {

        const allHospitals = await hospitalsModel.find();    
        console.log(`✅ Found ${allHospitals.length} doctors`);
        return res.status(200).json(allHospitals);
    } catch (error) {
        console.error("Error in getAllHospitals controller:", error);
        return res.status(500).json({ error: "Internal server error while fetching hospitals" });
    }
};

// ==============================
// DELETE HOSPITAL CONTROLLER
// ==============================

export const deleteHospital = async (req: Request, res: Response): Promise<any> => {
    try {

        const { id } = req.params;
        if (!id) {
            console.error("❌ Hospital ID is required for deletion");
            return res.status(400).json({ error: "Hospital ID is required" });
        }

        const deleted = await hospitals.findByIdAndDelete(id);
        if (!deleted) {
            console.error(`❌ Hospital with ID ${id} not found`);
            return res.status(404).json({ error: "Hospital not found" });
        }
        console.log(`✅ Hospital with ID ${id} deleted successfully`);
        return res.status(200).json({ message: "Hospital deleted successfully" });
    } catch (error) {
        console.error("Error in deleteHospital");
        return res.status(500).json({ error: "Internal server error while deleting hospital" });
    }
}

// ==============================
// UPDATE HOSPITAL CONTROLLER
// ==============================

export const updatehospital = async (req: Request, res: Response): Promise<any> => {
    try {

        const { id } = req.params;
        const updateHospital = await hospitals.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updateHospital) {
            console.error(`❌ Hospital with ID ${id} not found`);
            return res.status(404).json({ error: "Hospital not found" });
        }
        console.log(`✅ Hospital with ID ${id} updated successfully`);
        return res.status(200).json({ message: "Hospital updated successfully", hospital: updateHospital });

    } catch (error) {
        console.error("Error in updateHospital controller:", error);
        return res.status(500).json({ error: "Internal server error while updating hospital" });
    }
};