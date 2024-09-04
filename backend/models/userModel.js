import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ['Admin', 'Customer'],
        default: 'Customer',
    },
    resetPasswordToken: String,  // Field to store the password reset token
    resetPasswordExpire: Date,   // Field to store the token expiration time
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

// Method to generate and hash the password reset token
userSchema.methods.getResetPasswordToken = function() {
    // Generate the token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set the resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set the expiration time (e.g., 10 minutes)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// Export the User model
const User = mongoose.model('User', userSchema);
export default User;