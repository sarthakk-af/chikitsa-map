import { Request, Response } from 'express';
import doctorsModel from '../schemas/doctors';
import hospitalsModel from '../schemas/hospitals';
import mongoose, { mongo, MongooseError } from 'mongoose';
import hospitals from '../schemas/hospitals';


export const linkDoctorToHospital = async (req: Request, res: Response): Promise<any> => {
    try {

        const { doctorId, hospitalId } = req.body;


        if (!mongoose.Types.ObjectId.isValid(doctorId) || !mongoose.Types.ObjectId.isValid(hospitalId)) {
            return res.status(400).json({ error: 'Invlaid doctor or hospital ID' });
        }

        const doctor = await doctorsModel.findById(doctorId);
        const hospital = await hospitalsModel.findById(hospitalId);

        if (!doctor || !hospital) {
            return res.status(400).json({ error: 'Doctor and Hospital not found' });
        }

        //Add hospital to doctor 
        await doctorsModel.findByIdAndUpdate(doctorId, {
            $addToSet: { hospitals: hospital._id },
        });

        await hospitalsModel.findByIdAndUpdate(hospitalId, {
            $addToSet: { doctors: doctor._id },
        });


        console.log(`🔗 Linked doctor ${doctor.name} to hospital ${hospital.name}`);
        return res.status(200).json({ message: 'Doctor linked to hospital successfully' });

    } catch (error) {
        console.log("Error linking doctor and hospital")
        return res.status(400).json({ error: 'Error in linking doctor and hospital' });
    }
};

export const linkHospitalToDoctor = async (req: Request, res: Response): Promise<any> => {
    try {

        const { doctorId, hospitalId } = req.body;


        if (!mongoose.Types.ObjectId.isValid(doctorId) || !mongoose.Types.ObjectId.isValid(hospitalId)) {
            return res.status(400).json({ error: 'Invlaid doctor or hospital ID' });
        }

        const doctor = await doctorsModel.findById(doctorId);
        const hospital = await hospitalsModel.findById(hospitalId);

        if (!doctor || !hospital) {
            return res.status(400).json({ error: 'Doctor and Hospital not found' });
        }

        //Add hospital to doctor 
        await doctorsModel.findByIdAndUpdate(doctorId, {
            $addToSet: { hospitals: hospital._id },
        });

        await hospitalsModel.findByIdAndUpdate(hospitalId, {
            $addToSet: { doctors: doctor._id },
        });


        console.log(`🔗 Linked doctor ${doctor.name} to hospital ${hospital.name}`);
        return res.status(200).json({ message: 'Hospital linked to doctor successfully' });

    } catch (error) {
        console.log("Error linking doctor and hospital")
        return res.status(400).json({ error: 'Error in linking doctor and hospital' });
    }
};



export const unlinkDoctorfromHospital = async (req: Request, res: Response): Promise<any> => {
    try {
        

        const { doctorId, hospitalId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(doctorId) || !mongoose.Types.ObjectId.isValid(hospitalId)) {
            return res.status(400).json({ error: 'Invalid doctor or hospital ID' });
        }

        const doctor = await doctorsModel.findById(doctorId);
        const hospital = await hospitalsModel.findById(hospitalId);

        if (!doctor || !hospital) {
            return res.status(404).json({ error: 'Doctor or Hospital not found' });
        }

        //Remove hospital from doctor
        await doctorsModel.findByIdAndDelete(doctorId, {
            $pull: { hospitals: hospital._id },
        });

        //Remove doctor from hospital
        await hospitalsModel.findByIdAndDelete(hospitalId, {
            $pull: { doctors: doctor._id }
        });

        console.log(`🚫 Unlinked doctor ${doctor.name} from hospital ${hospital.name}`);
        return res.status(200).json({ message: 'Doctor unlinked from hospital successfully' });


    } catch (error) {
        console.warn('Error in unlinking Doctor from hospital');
        return res.status(400).json({ error: 'Error in unlinking Doctor from Hospital' });
    }
};


export const unlinkHospitalfromDoctor = unlinkDoctorfromHospital;