import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    googleId:{
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    name:{
        type:String,
        
        required:false
    },
    lastname:{
        typr:String,
        required:false
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
    state: {
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
