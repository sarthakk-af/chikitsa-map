import {registerAdmin, loginAdmin} from '../controllers/adminsControllers';
import express from 'express';
import { verifyToken } from '../middleware/verifyToken';    
import { isAdmin } from '../middleware/isAdmin';


const router = express.Router();
router.post('/registerAdminSecretly',registerAdmin);
router.post('/loginAdmin',loginAdmin);

router.get('/dashboard', verifyToken,isAdmin,(req,res)=>{
     res.status(200).json({
        message:`Welcome admin ${req.user?.email}`,
     });
});





export default router;
