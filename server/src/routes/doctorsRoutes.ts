import express from 'express';
import { addDoctor, updateDoctor, deleteDoctor,getAllDoctors  } from '../controllers/doctorsControllers';    
import { verifyToken } from '../middleware/verifyToken';
import { isAdmin } from '../middleware/isAdmin';



const router = express.Router();
router.use(express.json());

router.delete('/deleteDoctor/:id',deleteDoctor)
router.post('/addDoctor',addDoctor);
router.get('/getAllDoctors',getAllDoctors);
router.put('/updateDoctor/:id',updateDoctor);

// router.delete('/deleteDoctor/:id',verifyToken,isAdmin,deleteDoctor)
// router.post('/addDoctor',verifyToken,isAdmin,addDoctor);
// router.get('/getAllDoctors',verifyToken,isAdmin,getAllDoctors);
// router.put('/updateDoctor/:id',verifyToken,isAdmin,updateDoctor);

export default router;