import {Request , Response} from 'express';
import hospitals from '../schemas/hospitals';
import doctors from '../schemas/doctors';



// ==============================
// ADD HOSPITAL CONTROLLER 
// ==============================

export const addHospital = async (req:Request , res:Response ):Promise<any> =>{
    try {
        const {name , 
            type , 
            address, 
            city , 
            phone , 
            timetable , 
            medicationsOffered, 
            doctors ,
            specialists ,} = req.body;

        // Validate required fields
        if(!name ||
            !type ||
            !address ||
            !city ||
            !phone ||
            !timetable ||
            !medicationsOffered?.length ||
            !doctors?.length ||
            !specialists?.length){
                console.error("❌ Missing required fields in request body");
                return res.status(400).json({error:"Please fill all the required fields"});
            }

            //save hospital to database
            const newHospital = new hospitals({
                name,
                type,
                address,
                city,
                phone,
                timetable,
                medicationsOffered,
                doctors,
                specialists,
            });

            const savedHospital = await newHospital.save();
            console.log("✅ Hospital added successfully:", savedHospital);
            return res.status(201).json({
                message:"Hopital added successfully",
                hospital:savedHospital
            });
    }catch(error){
        console.error("Error in addHospital controller:",error);
        return res.status(500).json({error:"Internal server error while adding hospital"});
    }
};

// ==============================
// GET ALL HOSPITALS CONTROLLER 
// ==============================

export const getAllHospitals = async (req:Request , res:Response ):Promise<any> => {
    try{

        const allHospitals = await hospitals.find().populate('doctors');
        return res.status(200).json(allHospitals);
        }catch(error){
        console.error("Error in getAllHospitals controller:",error);
        return res.status(500).json({error:"Internal server error while fetching hospitals"});
    }
}

// ==============================
// DELETE HOSPITAL CONTROLLER
// ==============================

export const deleteHospital = async(req:Request , res:Response):Promise<any> => {
    try{

        const {id}= req.params;
        if(!id){
            console.error("❌ Hospital ID is required for deletion");
            return res.status(400).json({error:"Hospital ID is required"});
        }

        const deleted = await hospitals.findByIdAndDelete(id);
        if(!deleted){
            console.error(`❌ Hospital with ID ${id} not found`);
            return res.status(404).json({error:"Hospital not found"});
        }
        console.log(`✅ Hospital with ID ${id} deleted successfully`);
        return res.status(200).json({message:"Hospital deleted successfully"}); 
        }catch(error){
        console.error("Error in deleteHospital");
        return res.status(500).json({error:"Internal server error while deleting hospital"});
    }
}

// ==============================
// UPDATE HOSPITAL CONTROLLER
// ==============================

export const updatehospital = async (req:Request , res:Response):Promise<any> => {
    try{

        const {id} = req.params;
        const updateHospital = await hospitals.findByIdAndUpdate(id, req.body,{
            new:true,
            runValidators:true,
        });

        if(!updateHospital){
            console.error(`❌ Hospital with ID ${id} not found`);
            return res.status(404).json({error:"Hospital not found"});
        }
        console.log(`✅ Hospital with ID ${id} updated successfully`);
        return res.status(200).json({message:"Hospital updated successfully", hospital:updateHospital});

    }catch(error){
        console.error("Error in updateHospital controller:",error);
        return res.status(500).json({error:"Internal server error while updating hospital"});
    }
};