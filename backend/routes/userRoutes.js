import express from 'express';
import * as userController from '../controllers/userControllers.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

// Public routes
userRoutes.post('/register', userController.registerUser);
userRoutes.post('/login', userController.authUser);
userRoutes.put('/forgot-password', userController.forgotPassword);
userRoutes.put('/resetpassword/:token', userController.resetPassword);

// Private routes (require protect)
userRoutes.use(protect); // Apply protect middleware to all routes below this line

userRoutes.route('/profile')
    .get(userController.getUserProfile)
    .put(userController.updateUserProfile);
userRoutes.post('/logout', userController.logoutUser);

userRoutes.put('/password/update', userController.updatePassword);

// Admin routes (require both protect and admin)
userRoutes.use(admin); // Apply admin middleware to all routes below this line

userRoutes.route('/')
    .get(userController.getUsers);

userRoutes.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

export default userRoutes;