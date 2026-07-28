import mongoose, { Schema, Document, Model } from 'mongoose';
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export default UserModel;
//# sourceMappingURL=user.model.js.map