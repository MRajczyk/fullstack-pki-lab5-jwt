import express from 'express' 
import { loginUser, refreshTokenVerify, accessTokenVerify, createUser} from './controllers/auth.js' 
import { getUserList } from './controllers/users.js'

const router = express.Router(); 

router.post('/auth/signin', loginUser); 
router.post('/auth/register', createUser); 
router.post('/refresh', refreshTokenVerify); 

router.get('/data/public', loginUser); 
router.get('/data/logged', loginUser); 
router.get('/data/admin', loginUser); 

// secure router 
router.get('/users', accessTokenVerify, getUserList);

export default router;