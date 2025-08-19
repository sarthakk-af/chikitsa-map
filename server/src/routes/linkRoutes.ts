import  express  from "express";
import { linkDoctorToHospital , linkHospitalToDoctor, unlinkDoctorfromHospital, unlinkHospitalfromDoctor } from "../controllers/linkControllers";
import { verifyToken } from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";
import { Request,Response } from "express";

const router = express.Router();

router.get('/test', (req: Request, res: Response) => {
  res.send('✅ Link routes working!');
});

// router.post('/doctor-to-hospital',linkDoctorToHospital)
// router.post('/hospital-to-doctor',linkHospitalToDoctor)

// router.delete('/doctor-from-hospital',unlinkDoctorfromHospital)
// router.delete('/hospital-from-doctor',unlinkHospitalfromDoctor)


export default router;


router.post('/doctor-to-hospital',verifyToken,isAdmin,linkDoctorToHospital)
router.post('/hospital-to-doctor',verifyToken,isAdmin,linkHospitalToDoctor)

router.delete('/doctor-from-hospital',verifyToken, isAdmin,unlinkDoctorfromHospital)
router.delete('/hospital-from-doctor',verifyToken,isAdmin,unlinkHospitalfromDoctor)

