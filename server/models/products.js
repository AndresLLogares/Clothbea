import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    Id: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    comments: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Produts = mongoose.model("products", productSchema);

export default Produts
