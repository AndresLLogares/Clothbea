import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    wishlist: {
        type: Array,
        required: false
    },
    level: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    ZIP: {
        type: String,
        required: false
    },
    cart:{
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const user = mongoose.model("users", userSchema);

export default user;
