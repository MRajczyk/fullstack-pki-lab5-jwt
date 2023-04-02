import express from 'express' 
import { loginUser, refreshTokenVerify, accessTokenVerify, createUser} from './controllers/auth.js' 
import { getPublicData, getLoggedUserData, getAdminData } from './controllers/data.js';
import { getUserList } from './controllers/users.js'

const router = express.Router(); 

router.post('/auth/signin', loginUser); 
router.post('/auth/register', createUser);
router.post('/refresh', refreshTokenVerify); 

// secure router 
router.get('/users', accessTokenVerify, getUserList);

//data endpoints
router.get('/data/public', getPublicData);
router.get('/data/logged', accessTokenVerify, getLoggedUserData);
router.get('/data/admin', accessTokenVerify, getAdminData);

export default router;