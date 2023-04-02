import express from 'express' 
import { loginUser, refreshTokenVerify, accessTokenVerify, createUser} from './controllers/auth.js' 
import { getDataList } from './controllers/data.js';
import { getUserList } from './controllers/users.js'

const router = express.Router(); 

router.post('/auth/signin', loginUser); 
router.post('/auth/register', createUser); 
router.post('/refresh', refreshTokenVerify); 
//
router.get('/data/public', getDataList);

// secure router 
router.get('/users', accessTokenVerify, getUserList);
//
router.get('/data/logged', accessTokenVerify, getDataList);
router.get('/data/admin', accessTokenVerify, getDataList);

export default router;