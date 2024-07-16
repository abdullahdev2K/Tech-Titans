import express from 'express';
import * as userController from '../controllers/userControllers.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

// Public routes
userRoutes.post('/register', userController.registerUser);
userRoutes.post('/login', userController.authUser);

// Private routes
userRoutes.route('/profile')
    .get(protect, userController.getUserProfile)
    .put(protect, userController.updateUserProfile);

// Admin routes
userRoutes.route('/')
    .get(protect, admin, userController.getUsers);

userRoutes.route('/:id')
    .get(protect, admin, userController.getUserById)
    .put(protect, admin, userController.updateUser)
    .delete(protect, admin, userController.deleteUser);

userRoutes.route('/:id/approveRole').put(protect, admin, userController.approveUserRole);

export default userRoutes;