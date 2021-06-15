import express from 'express';
import bodyParser from 'body-parser';
import SubCategories from '../models/subcategories.js';
const subcategories = express.Router();

subcategories.use(bodyParser.json({ limit: "30mb", extended: true }));
subcategories.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

subcategories.get('/subcategories', async (req, res) => {
    try {
        const getSubCategories = await SubCategories.find({})
        res.status(200).json(getSubCategories)
    }
    catch (err) {
        console.log("Error SubCategories")
        res.status(500).json({ message: "Server Error" });
    }
});

export default subcategories;