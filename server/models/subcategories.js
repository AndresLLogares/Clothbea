import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const subCategories = mongoose.model("subcategories", subCategorySchema);

export default subCategories
