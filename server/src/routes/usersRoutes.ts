import express from 'express';
import {registerUser , loginUser} from '../controllers/usersControllers';
const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
export default router;

