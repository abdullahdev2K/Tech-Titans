import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Schema to store user information
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Employee', 'Customer'],
        default: 'Customer',
    },
    requestedRole: {
        type: String,
        enum: ['Admin', 'Employee', null],
        default: null,
    }
}, { timestamps: true });

// Middleware to hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
const User = mongoose.model('User', userSchema);
export default User;