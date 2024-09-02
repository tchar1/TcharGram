import express, {Router} from 'express'
import isTokenValid from '../middlewares/isTokenValid.js'
// import rateLimit from "express-rate-limit"; will add later in prod
import {register,login, logout, getProfile, editProfile, followOrUnfollow, getSuggestedUsers} from '../controllers/user.controller.js'
import upload from "../middlewares/multer.js";

const router: Router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/test').post(isTokenValid,login);
router.route('/logout').get(logout);
router.route('/profile/:id').get(isTokenValid, getProfile);
router.route('/testprofile/:id').get(getProfile);
router.post('/profile/edit/:id', isTokenValid, upload.single('profilePicture'), editProfile);
router.route('/suggested').get(isTokenValid, getSuggestedUsers);
router.route('/followorunfollow/:id').post(isTokenValid, followOrUnfollow);

export default router;


