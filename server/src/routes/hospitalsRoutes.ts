import express from 'express';
import { addHospital, getAllHospitals , updatehospital, deleteHospital } from '../controllers/hospitalsControllers';
import { verifyToken } from '../middleware/verifyToken';    
import { isAdmin } from '../middleware/isAdmin';

const router = express.Router();
router.use(express.json());

router.post('/addhospital', addHospital);
router.get('/allhospitals', getAllHospitals);
router.delete('/deletehospital/:id', deleteHospital);
router.put('/updatehospital/:id', updatehospital);

// router.post('/addhospital',verifyToken,isAdmin, addHospital);
// router.get('/allhospitals',verifyToken,isAdmin, getAllHospitals);
// router.delete('/deletehospital/:id',verifyToken,isAdmin, deleteHospital);
// router.put('/updatehospital/:id',verifyToken,isAdmin, updatehospital);
export default router;