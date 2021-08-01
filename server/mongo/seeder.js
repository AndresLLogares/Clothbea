import dotenv from 'dotenv';
import productsdata from './data/products.js';
import categoriesdata from './data/categories.js';
import subcategoriesdata from './data/subcategories.js';
import admindata from './data/user.js';
import connectDB from './config/connect.js';
import Product from './models/products.js';
import Category from './models/categories.js';
import SubCategory from './models/subcategories.js';
import Users from './models/users.js';
import Orders from './models/orders.js';
dotenv.config()

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Orders.deleteMany({});
    await Category.deleteMany({});
    await SubCategory.deleteMany({});
    await Users.deleteMany({});
    await Product.insertMany(productsdata);
    await Category.insertMany(categoriesdata);
    await SubCategory.insertMany(subcategoriesdata);
    await Users.insertMany(admindata);
    console.log("Data Import Success");
    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();