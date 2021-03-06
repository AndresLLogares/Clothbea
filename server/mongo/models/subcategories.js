import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  Id: {
    type: Number,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const subCategories = mongoose.model("subcategories", subCategorySchema);

export default subCategories;
